import { useState, useEffect } from "react";
import { Member, Server } from "@/types/types";
import { useSupabase } from "@/contexts/SupabaseProvider";
import { useSupabaseInitialized } from "@/lib/hooks";
import { updateNickname } from "@/lib/utilities";

export const useMemberManagement = (
  selectedServer: Server | null,
  fetchedMembers: Member[]
) => {
  const { supabase } = useSupabase();
  const [members, setMembers] = useState<Member[]>([]);
  const [isUpdating, setIsUpdating] = useState<Set<string>>(new Set());

  useSupabaseInitialized();

  useEffect(() => {
    if (fetchedMembers) {
      setMembers(fetchedMembers);
    }
  }, [fetchedMembers]);

  const handleUpdateNicknameLocally = (index: number, nickname: string) => {
    setMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      const memberToUpdate = updatedMembers[index];
      if (memberToUpdate) {
        updatedMembers[index] = {
          ...memberToUpdate,
          nickname,
        };
      }
      return updatedMembers;
    });
  };

  const handleUpdateNickname = async (
    userId: string,
    nickname: string,
    globalName: string
  ) => {
    if (!supabase) return;
    try {
      setIsUpdating((prev) => new Set(prev).add(userId));
      console.log(globalName);
      await updateNickname(
        selectedServer?.id ?? "",
        userId,
        nickname,
        globalName
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const handleUpdateSelectedNicknames = async (selectedMembers: Member[]) => {
    if (!supabase) return;

    selectedMembers.forEach((member) =>
      setIsUpdating((prev) => new Set(prev).add(member.user_id))
    );

    try {
      //await saveNicknames(supabase, selectedServer?.id ?? "", nicknamesToSave);

      const updatePromises = selectedMembers.map((member: Member) =>
        handleUpdateNickname(member.user_id, member.nickname, member.globalName)
      );

      await Promise.all(updatePromises);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(new Set());
    }
  };

  return {
    members,
    setMembers,
    isUpdating,
    handleUpdateNicknameLocally,
    handleUpdateNickname,
    handleUpdateSelectedNicknames,
  };
};
