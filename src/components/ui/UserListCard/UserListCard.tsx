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
import { useUserListCard } from "@/components/ui/UserListCard/useUserListCard";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../button";
import { Input } from "../input";
import { LoadingOverlay } from "./LoadingOverlay";

interface UserListCardProps {
  member: Member;
  isUpdating: Set<string>;
  isApplyingAll?: boolean;
  selectedServer: Server | null;
  onNicknameChange: (nickname: string) => void;
  onApplyNickname: () => void;
  isDragOverlay?: boolean;
  draggedNickname?: string;
}

export const UserListCard: React.FC<UserListCardProps> = ({
  member,
  isUpdating,
  selectedServer,
  onNicknameChange,
  onApplyNickname,
  isDragOverlay = false,
  draggedNickname,
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
        <div className={styles.dragOverlay.container}>
          <div className={styles.dragOverlay.text}>
            <ArrowDownUp className={styles.dragOverlay.icon} />
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
      className={`${styles.card} ${
        isDropTarget ? styles.dropTarget.ring : ""
      } ${isDragSource ? styles.dragSource : ""}`}
      style={dragStyle}
    >
      <LoadingOverlay showOverlay={showOverlay} />

      <AnimatePresence>
        {isDropTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.dropTarget.overlay}
          ></motion.div>
        )}
      </AnimatePresence>

      <div className={styles.backgroundOverlay}></div>

      <div className={styles.mainContent}>
        <div className={styles.avatarContainer}>
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

        <div className={styles.inputSection.container}>
          <div className={styles.inputSection.inputWrapper}>
            <Input
              value={displayValue}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              maxLength={30}
              placeholder={`Nickname for ${member.username}`}
              className={styles.inputSection.input}
              disabled={showOverlay}
            />

            {inputValue && !showOverlay && !isExpanded && !isDragOverlay && (
              <div
                ref={setDragRef}
                className={styles.inputSection.dragHandle}
                {...draggableAttributes}
                {...draggableListeners}
              >
                <GripVertical className={styles.inputSection.dragIcon} />
              </div>
            )}
          </div>

          <div className={styles.username}>
            {member.username}
            {member.userTag}
          </div>
        </div>

        <div className={styles.buttonSection.container}>
          <AnimatePresence mode="wait">
            {showOverlay ? (
              <motion.div
                key="apply-loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.buttonSection.loaderContainer}
              >
                <Loader2 className={styles.buttonSection.loader} />
              </motion.div>
            ) : (
              <motion.div
                key="apply-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.buttonSection.buttonWrapper}
              >
                <Button
                  onClick={handleApplyNickname}
                  disabled={showOverlay || !inputValue}
                  className={styles.applyButton}
                >
                  <Check className={styles.buttonSection.buttonIcon} />
                  Apply
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.buttonSection.resetContainer}>
            <motion.div
              animate={{
                opacity: showResetSuccess ? 0 : 1,
                transition: { duration: 0.1 },
              }}
              className={styles.buttonSection.buttonWrapper}
            >
              <Button
                onClick={handleRevert}
                disabled={showOverlay}
                className={styles.resetButton}
              >
                <RotateCcw className={styles.buttonSection.buttonIcon} />
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
                className={styles.buttonSection.resetSuccess}
              >
                <Check className={styles.buttonSection.successIcon} />
              </motion.div>
            )}
          </div>
        </div>

        <button onClick={handleExpansionToggle} className={styles.expandButton}>
          <NotebookText className={styles.expandIcon} />
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.1 }}
            className={styles.expandedSection.container}
          >
            <div className={styles.expandedSection.content}>
              <button
                onClick={handleExpansionToggle}
                className={styles.expandedSection.closeButton}
              >
                <X className={styles.expandedSection.closeIcon} />
              </button>
              <div className={styles.expandedSection.title}>
                Saved Nicknames
              </div>
              {isLoadingNicknames ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={styles.expandedSection.loadingText}
                >
                  <Loader2 className={styles.expandedSection.loadingIcon} />
                  <span>Loading nicknames...</span>
                </motion.div>
              ) : fetchError ? (
                <div className={styles.expandedSection.errorText}>
                  {fetchError}
                </div>
              ) : previousNicknames.length === 0 ? (
                <div className={styles.expandedSection.emptyText}>
                  No nicknames found. Add some!
                </div>
              ) : (
                <div className={styles.expandedSection.nicknamesContainer}>
                  <div className={styles.expandedSection.nicknamesList}>
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
                            className={styles.expandedSection.nicknameItem}
                          >
                            <button
                              onClick={() =>
                                handleNicknameSelect(nickname.nickname)
                              }
                              className={styles.expandedSection.nicknameButton}
                            >
                              {nickname.nickname}
                            </button>
                            <button
                              onClick={() =>
                                handleNicknameDeleteWithDelay(nickname)
                              }
                              className={styles.expandedSection.deleteButton}
                            >
                              <X
                                className={styles.expandedSection.deleteIcon}
                              />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>
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
