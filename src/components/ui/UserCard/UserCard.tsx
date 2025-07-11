"use client";

import { AnimatePresence, motion } from "framer-motion";
import { styles } from "./UserCard.styles";
import { useUserCard, useDnd } from "@/lib/hooks";
import LoadingOverlay from "@/components/ui/UserCard/UserCardChildren/LoadingOverlay";
import DragOverlay from "../dnd/DragOverlay";
import DropTargetOverlay from "../dnd/DropTargetOverlay";
import UserCardContent from "./UserCardChildren/UserCardContent";
import NicknamesList from "./UserCardChildren/NicknamesList";

import { UserCardProps } from "@/components/ui/UserCard/UserCard.types";

export default function UserCard({
  member,
  isUpdating,
  selectedServer,
  onUpdateNicknameLocally,
  onApplyNickname,
  isDragOverlay = false,
}: UserCardProps) {
  const {
    inputValue,
    isExpanded,
    handleInputChange,
    handleBlur,
    handleFocus,
    handleExpansionToggle,
    handleImageError,
    previousNicknames,
    isLoadingNicknames,
    fetchError,
    deletingNicknames,
    handleNicknameSelectAndClose,
    handleNicknameDeleteWithDelay,
    showResetSuccess,
    handleRevert,
    handleApplyNickname,
  } = useUserCard({
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
      <UserCardContent
        member={member}
        inputValue={inputValue}
        displayValue={displayValue}
        showOverlay={showOverlay}
        isExpanded={isExpanded}
        isDragOverlay={isDragOverlay}
        draggableAttributes={draggableAttributes}
        draggableListeners={draggableListeners}
        setDragRef={setDragRef}
        handleInputChange={handleInputChange}
        handleBlur={handleBlur}
        handleFocus={handleFocus}
        handleImageError={handleImageError}
        handleExpansionToggle={handleExpansionToggle}
        showResetSuccess={showResetSuccess}
        handleRevert={handleRevert}
        handleApplyNickname={handleApplyNickname}
      />

      <AnimatePresence>
        {isExpanded && (
          <NicknamesList
            member={member}
            selectedServer={selectedServer}
            onUpdateNicknameLocally={onUpdateNicknameLocally}
            onApplyNickname={onApplyNickname}
            handleExpansionToggle={handleExpansionToggle}
            previousNicknames={previousNicknames}
            isLoadingNicknames={isLoadingNicknames}
            fetchError={fetchError}
            deletingNicknames={deletingNicknames}
            handleNicknameSelectAndClose={handleNicknameSelectAndClose}
            handleNicknameDeleteWithDelay={handleNicknameDeleteWithDelay}
            isUpdating={isUpdating}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
