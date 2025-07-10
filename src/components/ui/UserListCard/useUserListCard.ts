import { useState, useEffect, useCallback } from "react";
import { useAnimation } from "framer-motion";
import { Member, Nickname } from "@/types/types";
import { fetchNicknames, deleteNickname } from "@/lib/utilities";
import { useSupabase } from "@/contexts/SupabaseProvider";

interface UseUserListCardProps {
  member: Member;
  selectedServer: string;
  onUpdateNicknameLocally: (nickname: string) => void;
  onApplyNickname: () => void;
}

export const useUserListCard = ({
  member,
  selectedServer,
  onUpdateNicknameLocally,
  onApplyNickname,
}: UseUserListCardProps) => {
  const [inputValue, setInputValue] = useState(
    member.nickname || member.globalName || ""
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isUserCurrentlyEditing, setIsUserCurrentlyEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [previousNicknames, setPreviousNicknames] = useState<Nickname[]>([]);
  const [isLoadingNicknames, setIsLoadingNicknames] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [deletingNicknames, setDeletingNicknames] = useState<string[]>([]);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  const controls = useAnimation();
  const { supabase } = useSupabase();

  useEffect(() => {
    if (!isUserCurrentlyEditing) {
      const valueToSet =
        member.nickname !== null && member.nickname !== undefined
          ? member.nickname
          : member.globalName || "";
      setInputValue(valueToSet);
    }
  }, [member.nickname, member.globalName, isUserCurrentlyEditing]);

  useEffect(() => {
    const fetchPreviousNicknames = async () => {
      if (!supabase) return;
      if (selectedServer && member.user_id) {
        setIsLoadingNicknames(true);
        setFetchError(null);
        try {
          const nicknames = await fetchNicknames(
            supabase,
            selectedServer,
            member.user_id
          );
          setPreviousNicknames(nicknames);
        } catch (error) {
          console.error("Failed to fetch nicknames:", error);
          setFetchError(
            "Unable to fetch previous nicknames. Please try again."
          );
        } finally {
          setIsLoadingNicknames(false);
        }
      }
    };

    fetchPreviousNicknames();
  }, [supabase, selectedServer, member.user_id]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsUserCurrentlyEditing(true);
      setInputValue(e.target.value);
      onUpdateNicknameLocally(e.target.value);
    },
    [onUpdateNicknameLocally]
  );

  const handleBlur = useCallback(() => {
    setIsInputFocused(false);
    setIsUserCurrentlyEditing(false);
  }, []);

  const handleFocus = useCallback(() => {
    setIsInputFocused(true);
  }, []);

  const handleRevert = useCallback(() => {
    const globalName = member.globalName || "";
    setInputValue(globalName);
    onUpdateNicknameLocally(globalName);
    setShowResetSuccess(true);
    setTimeout(() => setShowResetSuccess(false), 400);
  }, [member.globalName, onUpdateNicknameLocally]);

  const handleExpansionToggle = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const handleNicknameSelect = useCallback(
    (nickname: string) => {
      setInputValue(nickname);
      onUpdateNicknameLocally(nickname);
      setIsExpanded(false);
    },
    [onUpdateNicknameLocally]
  );

  const handleNicknameDelete = useCallback(
    (nickname: Nickname) => {
      if (!supabase) return;
      if (nickname && selectedServer && member.user_id) {
        setDeletingNicknames((prev) => [...prev, nickname.nickname]);
        deleteNickname(
          supabase,
          selectedServer,
          member.user_id,
          nickname.nickname
        )
          .then(() => {
            setPreviousNicknames((prevNicknames) =>
              prevNicknames.filter(
                (nick) => nick.nickname !== nickname.nickname
              )
            );
          })
          .catch((error) => {
            console.error("Error deleting nickname:", error);
          })
          .finally(() => {
            setTimeout(() => {
              setDeletingNicknames((prev) =>
                prev.filter((n) => n !== nickname.nickname)
              );
            }, 200);
          });
      }
    },
    [supabase, selectedServer, member.user_id]
  );

  const handleNicknameDeleteWithDelay = useCallback(
    (nickname: Nickname) => {
      setDeletingNicknames((prev) => [...prev, nickname.nickname]);
      setTimeout(() => handleNicknameDelete(nickname), 200);
    },
    [handleNicknameDelete]
  );

  const handleApplyNickname = useCallback(async () => {
    onApplyNickname();
  }, [onApplyNickname]);

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      e.currentTarget.src = "/default-avatar.png";
    },
    []
  );

  return {
    inputValue,
    isInputFocused,
    isUserCurrentlyEditing,
    isExpanded,
    previousNicknames,
    isLoadingNicknames,
    fetchError,
    deletingNicknames,
    showResetSuccess,
    controls,

    handleInputChange,
    handleBlur,
    handleFocus,
    handleRevert,
    handleExpansionToggle,
    handleNicknameSelect,
    handleNicknameDelete,
    handleNicknameDeleteWithDelay,
    handleApplyNickname,
    handleImageError,
  };
};
