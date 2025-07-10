/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Member, Server } from "@/types/types";
import { styles } from "@/components/ui/UserCard/UserCard.styles";
import { Input } from "@/components/ui/input";
import { GripVertical, NotebookText } from "lucide-react";
import { ActionButtons } from "@/components";

interface UserCardContentProps {
  member: Member;
  selectedServer: Server | null;
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
  onUpdateNicknameLocally: (nickname: string) => void;
  onApplyNickname: () => void;
}

export default function UserCardContent({
  member,
  selectedServer,
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
  onUpdateNicknameLocally,
  onApplyNickname,
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
        member={member}
        selectedServer={selectedServer}
        showOverlay={showOverlay}
        onUpdateNicknameLocally={onUpdateNicknameLocally}
        onApplyNickname={onApplyNickname}
      />

      <button onClick={handleExpansionToggle} className={styles.expandButton}>
        <NotebookText className={styles.expandIcon} />
      </button>
    </div>
  );
}
