import { useEffect, useState } from "react";
import { fetchMembers } from "@/lib/utilities";
import { Member } from "@/types/types";

export const useMembers = (guildId: string) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const data = await fetchMembers(guildId);
        setMembers(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch members"
        );
      }
    };

    if (guildId) {
      getMembers();
    }
  }, [guildId]);

  const getSortedMembers = (members: Member[]): Member[] => {
    const groupedMembers = members.reduce(
      (acc: Record<string, Member[]>, member) => {
        const highestRole = member.roles[0]?.name || "No Role";
        if (!acc[highestRole]) {
          acc[highestRole] = [];
        }
        acc[highestRole].push(member);
        return acc;
      },
      {}
    );

    const sortedRoles = Object.keys(groupedMembers).sort((a, b) => {
      const roleAPosition =
        members.find((m) => m.roles[0]?.name === a)?.roles[0]?.position ?? -1;
      const roleBPosition =
        members.find((m) => m.roles[0]?.name === b)?.roles[0]?.position ?? -1;
      return roleBPosition - roleAPosition;
    });

    return sortedRoles.flatMap((roleName) => groupedMembers[roleName]);
  };

  return { getSortedMembers, members, error };
};
