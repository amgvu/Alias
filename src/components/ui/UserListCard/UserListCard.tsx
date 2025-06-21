import React from "react";
import Image from "next/image";
import { styles } from "./UserListCard.styles";
import { Member, Server } from "@/types/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Check,
  RotateCcw,
  Loader2,
  GripVertical,
  ArrowDownUp,
  NotebookText,
} from "lucide-react";
import { useUserListCard } from "@/lib/hooks/useUserListCard";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../button";
import { Input } from "../input";

interface UserListCardProps {
  member: Member;
  isUpdating: Set<string>;
  isApplyingAll?: boolean;
  selectedServer: Server | null;
  onNicknameChange: (nickname: string) => void;
  onApplyNickname: () => void;
  isDragOverlay?: boolean;
  draggedNickname?: string;
  onNicknameSwap?: (
    fromUserId: string,
    toUserId: string,
    fromNickname: string,
    toNickname: string
  ) => void;
}

export const UserListCard: React.FC<UserListCardProps> = ({
  member,
  isUpdating,
  selectedServer,
  onNicknameChange,
  onApplyNickname,
  isDragOverlay = false,
  draggedNickname,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onNicknameSwap,
}) => {
  const {
    inputValue,
    isExpanded,
    previousNicknames,
    isLoadingNicknames,
    fetchError,
    deletingNicknames,
    showResetSuccess,

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
    selectedServer: selectedServer?.id ?? "",
    onNicknameChange,
    onApplyNickname,
  });
  const showOverlay = isUpdating.has(member.user_id);
  const {
    attributes: draggableAttributes,
    listeners: draggableListeners,
    setNodeRef: setDragRef,
    transform: dragTransform,
    isDragging,
  } = useDraggable({
    id: `nickname-${member.user_id}`,
    data: {
      type: "nickname",
      userId: member.user_id,
      nickname: inputValue || "",
      username: member.username,
    },
    disabled: !inputValue || showOverlay || isExpanded,
  });

  const {
    setNodeRef: setDropRef,
    isOver,
    active,
  } = useDroppable({
    id: `card-${member.user_id}`,
    data: {
      type: "usercard",
      userId: member.user_id,
      currentNickname: inputValue || "",
    },
  });

  const isDropTarget =
    isOver &&
    active?.data.current?.type === "nickname" &&
    active?.data.current?.userId !== member.user_id;
  const isDragSource = isDragging && !isDragOverlay;

  const dragStyle = isDragOverlay
    ? {}
    : {
        transform: CSS.Translate.toString(dragTransform),
        opacity: isDragSource ? 0.3 : 1,
        zIndex: isDragging ? 1000 : "auto",
      };

  const displayValue = isDragOverlay
    ? draggedNickname || inputValue
    : inputValue;

  if (isDragOverlay) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-zinc-900/10 backdrop-blur-lg -translate-x-[410px] rounded-lg shadow-xl border-2 border-dashed border-blue-400 text-left flex flex-col justify-center h-12 w-108">
          <div className="text-lg ml-2 text-center font-semibold text-white mb-1 flex items-center justify-center">
            <ArrowDownUp className="inline-block mt-0.5 text-blue-400 mr-2" />
            {displayValue}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={setDropRef}
      initial={{ y: 0 }}
      className={`${
        styles.card
      } relative bg-no-repeat bg-left transition-all duration-200 ${
        isDropTarget ? "ring-2 ring-blue-400 ring-opacity-50 bg-blue-50/10" : ""
      } ${isDragSource ? "opacity-50" : ""}`}
      style={dragStyle}
    >
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{
              opacity: 1,
              backdropFilter: "blur(8px)",
              background: [
                "rgba(0,0,0,0.3)",
                "rgba(0,0,0,0.4)",
                "rgba(0,0,0,0.3)",
              ],
            }}
            exit={{
              opacity: 0,
              backdropFilter: "blur(0px)",
            }}
            transition={{
              duration: 0.25,
              background: {
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              },
            }}
            className="absolute inset-0 z-20 flex items-center justify-center rounded-lg"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -45 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                },
              }}
              exit={{
                scale: 0.7,
                opacity: 0,
                rotate: 45,
              }}
            >
              <Loader2 className="animate-spin w-10 h-10 text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDropTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-blue-400/20 border-2 border-blue-400 border-dashed rounded-lg z-10 flex items-center justify-center"
          ></motion.div>
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
          <div className="relative flex items-center group">
            <Input
              value={displayValue}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              maxLength={30}
              placeholder={`Nickname for ${member.username}`}
              className="bg-input border border-border-subtle w-1/3 font-bold"
              disabled={showOverlay}
            />

            {inputValue && !showOverlay && !isExpanded && !isDragOverlay && (
              <div
                ref={setDragRef}
                className={`right-0 duration-200 top-1/2 transform mr-2 p-1.5 text-zinc-700 hover:text-zinc-500 cursor-grab active:cursor-grabbing group-hover:opacity-100 transition-all flex items-center justify-center rounded`}
                {...draggableAttributes}
                {...draggableListeners}
              >
                <GripVertical className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className={styles.username}>
            {member.username}
            {member.userTag}
          </div>
        </div>

        <div className="flex flex-row space-x-2">
          <AnimatePresence mode="wait">
            {showOverlay ? (
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
                <Button
                  onClick={handleApplyNickname}
                  disabled={showOverlay || !inputValue}
                  className="bg-button cursor-pointer text-text-primary hover:bg-button-hover transition-all duration-200 disabled:bg-disabled-button disabled:text-text-disabled border border-border-active flex items-center justify-center"
                >
                  <Check className="w-4 h-4 mr-[-2px]" />
                  Apply
                </Button>
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
              <Button
                onClick={handleRevert}
                disabled={showOverlay}
                className="bg-button cursor-pointer text-text-primary hover:bg-button-hover transition-all duration-200 disabled:bg-disabled-button disabled:text-text-disabled border border-border-active flex items-center justify-center"
              >
                <RotateCcw className="w-4 h-4 mr-[-2px]" />
                Reset
              </Button>
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
          className="p-2 transition-all text-zinc-700 hover:text-zinc-500 cursor-pointer rounded-lg"
        >
          <NotebookText className="w-5 h-5 transition-all duration-200" />
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.1 }}
            className="absolute inset-0 bg-sidebar/80 backdrop-blur-sm rounded-lg z-10 flex flex-col"
          >
            <div className="px-2 flex-1">
              <button
                onClick={handleExpansionToggle}
                className="p-2 right-3.5 top-3 fixed transition-all cursor-pointer rounded-lg"
              >
                <X className="w-5 h-5 text-zinc-700 hover:text-zinc-500 transition-all duration-200" />
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
                            className="px-3 py-1 text-sm font-medium bg-sidebar border-border-subtle border cursor-pointer transition-all hover:bg-card rounded-md"
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
