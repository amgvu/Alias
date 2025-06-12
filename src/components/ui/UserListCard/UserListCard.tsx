import React from "react";
import { DSInput, DSButton } from "@/components/";
import Image from "next/image";
import { styles } from "./UserListCard.styles";
import { Member } from "@/types/types";
import { AnimatePresence, motion } from "framer-motion";
import { BookUser, X, Check, RotateCcw, Loader2 } from "lucide-react";
import { useUserListCard } from "@/lib/hooks/useUserListCard";

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
  const {
    inputValue,
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
    handleNicknameDeleteWithDelay,
    handleApplyNickname,
    handleImageError,
  } = useUserListCard({
    member,
    selectedServer,
    onNicknameChange,
    onApplyNickname,
  });

  const showOverlay = isUpdating || isApplyingAll;

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
            onError={handleImageError}
          />
        </div>

        <div className="w-full text-lg flex flex-col justify-center">
          <DSInput
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
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
          onClick={handleExpansionToggle}
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
                onClick={handleExpansionToggle}
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
                  {previousNicknames.map((nickname) => (
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
                            onClick={() =>
                              handleNicknameSelect(nickname.nickname)
                            }
                            className="px-3 py-1 text-sm font-medium bg-zinc-950 border-zinc-600 border cursor-pointer transition-all hover:bg-zinc-700/80 rounded-md"
                          >
                            {nickname.nickname}
                          </button>

                          <button
                            onClick={() =>
                              handleNicknameDeleteWithDelay(nickname)
                            }
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
