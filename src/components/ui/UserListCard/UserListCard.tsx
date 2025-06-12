/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { DSInput, DSButton } from "@/components/";
import Image from "next/image";
import { styles } from "./UserListCard.styles";
import { Member, Nickname } from "@/types/types";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import {
  Menu,
  List,
  BookUser,
  ChevronUp,
  X,
  Check,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { fetchNicknames, deleteNickname } from "@/lib/utilities";
import { useSupabase } from "@/contexts/SupabaseProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UserListCardProps {
  member: Member;
  isUpdating: boolean;
  isApplyingAll?: boolean;
  selectedServer: string;
  onNicknameChange: (nickname: string) => void;
  onApplyNickname: () => void;
}

export const UserListCard: React.FC<UserListCardProps> = ({
  member,
  isUpdating,
  isApplyingAll = false,
  selectedServer,
  onNicknameChange,
  onApplyNickname,
}) => {
  const [inputValue, setInputValue] = useState(
    member.nickname || member.globalName || ""
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [previousNicknames, setPreviousNicknames] = useState<Nickname[]>([]);
  const [isLoadingNicknames, setIsLoadingNicknames] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isUserCurrentlyEditing, setIsUserCurrentlyEditing] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [deletingNicknames, setDeletingNicknames] = useState<string[]>([]);
  const { supabase } = useSupabase();
  const controls = useAnimation();

  const showOverlay = isUpdating || isApplyingAll; // make it so that it changes for each individual user if its actually updating or not

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUserCurrentlyEditing(true);
    setInputValue(e.target.value);
    onNicknameChange(e.target.value);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
    setIsUserCurrentlyEditing(false);
  };

  const handleRevert = () => {
    const globalName = member.globalName || "";
    setInputValue(globalName);
    onNicknameChange(globalName);
    setShowResetSuccess(true);
    setTimeout(() => setShowResetSuccess(false), 400);
  };

  const confirmDeleteNickname = (nickname: Nickname) => {
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
            prevNicknames.filter((nick) => nick.nickname !== nickname.nickname)
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
  };

  const handleApplyNickname = async () => {
    await controls.start({
      y: [0, 150, 0],
      transition: { duration: 0.1, ease: "easeOut" },
    });
    onApplyNickname();
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={controls}
      className={`${styles.card} relative bg-no-repeat bg-left`}
    >
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg"
          >
            <Loader2 className="animate-spin w-10 h-10 text-white" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0"></div>
      <div className="flex items-center space-x-2 relative z-10">
        <div className="h-full flex-shrink-0 relative">
          <Image
            src={member.avatar_url}
            alt={`${member.username}'s avatar`}
            width={128}
            height={128}
            className={styles.avatar}
            loading="lazy"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = "/default-avatar.png";
            }}
          />
        </div>
        <div className="w-full text-lg flex flex-col justify-center">
          <DSInput
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={handleBlur}
            placeholder={`Nickname for ${member.username}`}
            className={styles.nicknameInput}
            disabled={isUpdating}
          />
          <div className={styles.username}>
            {member.username}
            {member.userTag}
          </div>
        </div>

        <div className="flex flex-row space-x-2">
          <AnimatePresence mode="wait">
            {isUpdating ? (
              <motion.div
                key="apply-loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center justify-center w-[90px] h-[36px]`}
              >
                <Loader2 className="animate-spin w-5 h-5 text-zinc-100" />
              </motion.div>
            ) : (
              <motion.div
                key="apply-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                <DSButton
                  onClick={handleApplyNickname}
                  disabled={isUpdating || !inputValue}
                  className={`${styles.applyButton}`}
                >
                  <Check className="w-4 h-4 mr-[-2px]" />
                  Apply
                </DSButton>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative inline-block">
            <motion.div
              animate={{
                opacity: showResetSuccess ? 0 : 1,
                transition: { duration: 0.1 },
              }}
              className="inline-block"
            >
              <DSButton
                onClick={handleRevert}
                disabled={isUpdating}
                className={`${styles.applyButton} transition-all duration-200`}
              >
                <RotateCcw className="w-4 h-4 mr-[-2px]" />
                Reset
              </DSButton>
            </motion.div>
            {showResetSuccess && (
              <motion.div
                key="reset-success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <Check className="w-5 h-5 text-zinc-100" />
              </motion.div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 transition-all cursor-pointer rounded-lg"
        >
          <BookUser className="w-5 h-5 text-neutral-700 hover:text-neutral-100 transition-all duration-200" />
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.1 }}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm rounded-lg z-10 flex flex-col"
          >
            <div className="px-2 py-1 flex-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 right-3.5 top-3.5 fixed transition-all cursor-pointer rounded-lg"
              >
                <X className="w-5 h-5 text-neutral-700 hover:text-neutral-100 transition-all duration-200" />
              </button>
              <div className="flex items-center gap-2 mb-1 text-sm font-bold text-zinc-300">
                Saved Nicknames
              </div>

              {isLoadingNicknames ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-zinc-400 text-xs"
                >
                  <Loader2 className="animate-spin w-4 h-4" />
                  <span>Loading nicknames...</span>
                </motion.div>
              ) : fetchError ? (
                <div className="text-red-500">{fetchError}</div>
              ) : previousNicknames.length === 0 ? (
                <div className="text-zinc-500 text-xs italic">
                  No nicknames found. Add some!
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {previousNicknames.map((nickname, index) => (
                    <AnimatePresence
                      key={`${nickname.userId}-${nickname.nickname}`}
                    >
                      {!deletingNicknames.includes(nickname.nickname) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="relative"
                        >
                          <button
                            onClick={() => {
                              setInputValue(nickname.nickname);
                              onNicknameChange(nickname.nickname);
                              setIsExpanded(!isExpanded);
                            }}
                            className="px-3 py-1 text-sm font-medium bg-zinc-950 border-zinc-600 border cursor-pointer transition-all hover:bg-zinc-700/80 rounded-md"
                          >
                            {nickname.nickname}
                          </button>

                          <button
                            onClick={() => {
                              setDeletingNicknames((prev) => [
                                ...prev,
                                nickname.nickname,
                              ]);
                              setTimeout(
                                () => confirmDeleteNickname(nickname),
                                200
                              );
                            }}
                            className="absolute -top-1 -right-1 p-1 cursor-pointer text-sm text-white bg-red-400 rounded-full transition hover:bg-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserListCard;
