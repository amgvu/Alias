import React from "react";
import Image from "next/image";
import { styles } from "./UserListCard.styles";
import { Member, Server } from "@/types/types";
import { AnimatePresence, motion } from "framer-motion";
import { GripVertical, NotebookText } from "lucide-react";
import { useUserListCard } from "@/components/ui/UserListCard/useUserListCard";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "../input";
import { LoadingOverlay } from "./LoadingOverlay";
import { DropTargetOverlay } from "./dnd/DropTargetOverlay";
import { DragOverlay } from "./dnd/DragOverlay";
import { NicknamesList } from "./NicknamesList";
import { ActionButtons } from "./ActionButtons";

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

    handleInputChange,
    handleBlur,
    handleFocus,
    handleExpansionToggle,
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
          selectedServer={selectedServer}
          showOverlay={showOverlay}
          onNicknameChange={onNicknameChange}
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
            selectedServer={selectedServer}
            onNicknameChange={onNicknameChange}
            onApplyNickname={onApplyNickname}
            handleExpansionToggle={handleExpansionToggle}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserListCard;
