import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "./UserList.styles";
import { Checkbox } from "@/components/ui/checkbox";
import { Member } from "@/types/types";
import { useCheckboxSelection } from "@/lib/hooks/useCheckboxSelection";
import VirtualizerList from "./VirtualizerList";

interface UserListProps {
  members: Member[];
  isUpdating: Set<string>;
  selectedServer: string;
  onNicknameChange: (index: number, nickname: string) => void;
  onApplyNickname: (userId: string, nickname: string) => void;
  isApplyingAll: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  showCheckboxes: boolean;
  setShowCheckboxes: (show: boolean) => void;
}

export function DSUserList({
  members,
  isUpdating,
  selectedServer,
  onNicknameChange,
  onApplyNickname,
  isApplyingAll,
  onSelectionChange,
  showCheckboxes,
}: UserListProps) {
  const [animationKey, setAnimationKey] = useState(0);

  const {
    selectedUserIds,
    areAllMembersSelected,
    areAllRoleMembersSelected,
    handleCheckboxToggle,
    handleGlobalCheckboxChange,
    handleRoleCheckboxChange,
    checkboxContainerVariants,
  } = useCheckboxSelection({
    members,
    showCheckboxes,
    onSelectionChange,
  });

  useEffect(() => {
    if (isApplyingAll) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [isApplyingAll]);

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.container}>
        <div className="flex items-center">
          {showCheckboxes && (
            <motion.div
              variants={checkboxContainerVariants}
              initial="hidden"
              animate={showCheckboxes ? "visible" : "hidden"}
              className="overflow-hidden flex-shrink-0"
            >
              <Checkbox
                className="border-zinc-300 border-2 cursor-pointer"
                checked={areAllMembersSelected()}
                onCheckedChange={handleGlobalCheckboxChange}
              />
            </motion.div>
          )}
          {showCheckboxes && <span className="mb-1 ml-1">Select All</span>}
        </div>

        <VirtualizerList
          members={members}
          isUpdating={isUpdating}
          selectedServer={selectedServer}
          isApplyingAll={isApplyingAll}
          animationKey={animationKey}
          showCheckboxes={showCheckboxes}
          selectedUserIds={selectedUserIds}
          checkboxContainerVariants={checkboxContainerVariants}
          onNicknameChange={onNicknameChange}
          onApplyNickname={onApplyNickname}
          onCheckboxToggle={handleCheckboxToggle}
          onRoleCheckboxChange={handleRoleCheckboxChange}
          areAllRoleMembersSelected={areAllRoleMembersSelected}
        />
      </div>
    </div>
  );
}

export default DSUserList;
