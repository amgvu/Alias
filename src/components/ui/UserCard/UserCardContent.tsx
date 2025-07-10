/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Member } from "@/types/types";
import { styles } from "@/components/ui/UserCard/UserCard.styles";
import { Input } from "@/components/ui/input";
import { GripVertical, NotebookText } from "lucide-react";
import ActionButtons from "./ActionButtons";

interface UserCardContentProps {
  member: Member;
  inputValue: string;
  displayValue: string;
  showOverlay: boolean;
  isExpanded: boolean;
  isDragOverlay: boolean;
  draggableAttributes: any;
  draggableListeners: any;
  setDragRef: (element: HTMLElement | null) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  handleFocus: () => void;
  handleImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  handleExpansionToggle: () => void;
  showResetSuccess: boolean;
  handleRevert: () => void;
  handleApplyNickname: () => void;
}

export default function UserCardContent({
  member,
  inputValue,
  displayValue,
  showOverlay,
  isExpanded,
  isDragOverlay,
  draggableAttributes,
  draggableListeners,
  setDragRef,
  handleInputChange,
  handleBlur,
  handleFocus,
  handleImageError,
  handleExpansionToggle,
  showResetSuccess,
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
