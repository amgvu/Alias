import { useState, useEffect } from "react";
import { Member, Nickname, Server } from "@/types/types";
import { useSupabase } from "@/contexts/SupabaseProvider";
import { useSession } from "next-auth/react";
import { updateNickname, saveNicknames } from "@/lib/utilities";

export const useMemberManagement = (
  selectedServer: Server | null,
  fetchedMembers: Member[]
) => {
  const { supabase } = useSupabase();
  const { data: session, status } = useSession();
  const [members, setMembers] = useState<Member[]>([]);
  const [isUpdating, setIsUpdating] = useState<Set<string>>(new Set());
  const [isApplyingAll, setIsApplyingAll] = useState(false);

  useEffect(() => {
    if (supabase) {
    }
  }, [supabase, session, status]);

  useEffect(() => {
    if (fetchedMembers) {
      setMembers(fetchedMembers);
    }
  }, [fetchedMembers]);

  const handleNicknameChange = (index: number, nickname: string) => {
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
    globalName: string,
    saveToDb: boolean = true
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

      if (saveToDb) {
        const member = members.find((m: Member) => m.user_id === userId);
        if (member) {
          await saveNicknames(supabase, selectedServer?.id ?? "", [
            {
              userId: member.user_id,
              nickname: member.nickname || member.globalName,
              userTag: member.username,
              globalName: member.globalName,
            },
          ]);
        }
      }
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

  const applyAllNicknames = async () => {
    if (!supabase) return;
    setIsApplyingAll(true);
    try {
      const nicknamesToSave: Nickname[] = members.map((member: Member) => ({
        userId: member.user_id,
        nickname: member.nickname,
        userTag: member.username,
        globalName: member.globalName,
      }));

      await saveNicknames(supabase, selectedServer?.id ?? "", nicknamesToSave);

      const updatePromises = members.map((member: Member) =>
        handleUpdateNickname(
          member.user_id,
          member.nickname,
          member.globalName,
          false
        )
      );

      await Promise.all(updatePromises);
    } catch (error) {
      console.error(error);
    } finally {
      setIsApplyingAll(false);
    }
  };

  const applyNicknamesToSelection = async (selectedMembers: Member[]) => {
    if (!supabase) return;

    selectedMembers.forEach((member) =>
      setIsUpdating((prev) => new Set(prev).add(member.user_id))
    );

    try {
      const nicknamesToSave: Nickname[] = selectedMembers.map(
        (member: Member) => ({
          userId: member.user_id,
          nickname: member.nickname,
          userTag: member.username,
          globalName: member.globalName,
        })
      );

      await saveNicknames(supabase, selectedServer?.id ?? "", nicknamesToSave);

      const updatePromises = selectedMembers.map((member: Member) =>
        handleUpdateNickname(
          member.user_id,
          member.nickname,
          member.globalName,
          false
        )
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
    isApplyingAll,
    handleNicknameChange,
    handleUpdateNickname,
    applyAllNicknames,
    applyNicknamesToSelection,
  };
};
