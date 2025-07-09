import React from "react";
import Image from "next/image";
import { styles } from "./UserListCard.styles";
import { Member, Server } from "@/types/types";
import { AnimatePresence, motion } from "framer-motion";
import { GripVertical, NotebookText } from "lucide-react";
import { useUserListCard, useDnd } from "@/lib/hooks";
import { Input } from "../input";
import { LoadingOverlay } from "./LoadingOverlay";
import { DropTargetOverlay } from "../dnd/DropTargetOverlay";
import { DragOverlay } from "../dnd/DragOverlay";
import { NicknamesList } from "./NicknamesList";
import { ActionButtons } from "./ActionButtons";

interface UserListCardProps {
  member: Member;
  isUpdating: Set<string>;
  selectedServer: Server | null;
  onUpdateNicknameLocally: (nickname: string) => void;
  onApplyNickname: () => void;
  isDragOverlay?: boolean;
}

export default function UserListCard({
  member,
  isUpdating,
  selectedServer,
  onUpdateNicknameLocally,
  onApplyNickname,
  isDragOverlay = false,
}: UserListCardProps) {
  const {
    inputValue,
    isExpanded,

    handleInputChange,
    handleBlur,
    handleFocus,
    handleExpansionToggle,
    handleImageError,
  } = useUserListCard({
    isUpdating,
    member,
    selectedServer: selectedServer?.id ?? "",
    onUpdateNicknameLocally,
    onApplyNickname,
  });

  const {
    draggableAttributes,
    draggableListeners,
    isDropTarget,
    displayValue,
    dragStyle,
    isDragSource,
    showOverlay,

    setDragRef,
    setDropRef,
  } = useDnd({
    member,
    inputValue,
    isExpanded,
    isUpdating,
  });

  if (isDragOverlay) {
    return <DragOverlay displayValue={displayValue} />;
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
      <DropTargetOverlay isDropTarget={isDropTarget} />

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

        <ActionButtons
          member={member}
          isUpdating={isUpdating}
          selectedServer={selectedServer}
          showOverlay={showOverlay}
          onUpdateNicknameLocally={onUpdateNicknameLocally}
          onApplyNickname={onApplyNickname}
        />

        <button onClick={handleExpansionToggle} className={styles.expandButton}>
          <NotebookText className={styles.expandIcon} />
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <NicknamesList
            member={member}
            isUpdating={isUpdating}
            selectedServer={selectedServer}
            onUpdateNicknameLocally={onUpdateNicknameLocally}
            onApplyNickname={onApplyNickname}
            handleExpansionToggle={handleExpansionToggle}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
