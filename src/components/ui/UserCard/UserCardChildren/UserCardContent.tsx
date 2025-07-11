"use client";
import Image from "next/image";
import { styles } from "@/components/ui/UserCard/UserCard.styles";
import { Input } from "@/components/ui/input";
import { GripVertical, NotebookText } from "lucide-react";
import ActionButtons from "./ActionButtons";

import { UserCardContentProps } from "@/types/userCardContent";

export default function UserCardContent({
  member,
  inputValue,
  displayValue,
  showOverlay,
  isExpanded,
  isDragOverlay,
  draggableAttributes,
  draggableListeners,
  showResetSuccess,
  setDragRef,
  handleInputChange,
  handleBlur,
  handleFocus,
  handleImageError,
  handleExpansionToggle,
  handleRevert,
  handleApplyNickname,
}: UserCardContentProps) {
  return (
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
        showOverlay={showOverlay}
        inputValue={inputValue}
        showResetSuccess={showResetSuccess}
        handleRevert={handleRevert}
        handleApplyNickname={handleApplyNickname}
      />

      <button onClick={handleExpansionToggle} className={styles.expandButton}>
        <NotebookText className={styles.expandIcon} />
      </button>
    </div>
  );
}
