import { Member } from "@/types/types";

export const getSortedMembers = (members: Member[]) => {
  const grouped: Record<string, Member[]> = members.reduce(
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

  const sortedRoles = Object.keys(grouped).sort((a, b) => {
    const roleAPosition =
      members.find((m) => m.roles[0]?.name === a)?.roles[0]?.position ?? -1;
    const roleBPosition =
      members.find((m) => m.roles[0]?.name === b)?.roles[0]?.position ?? -1;
    return roleBPosition - roleAPosition;
  });

  return { grouped, sortedRoles };
};
