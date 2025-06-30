import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "./UserList.styles";
import { Checkbox } from "@/components/ui/checkbox";
import { Member, Server } from "@/types/types";
import { Loader2 } from "lucide-react";
import { useCheckboxSelection } from "@/lib/hooks";
import VirtualizerList from "./VirtualizerList";

interface UserListProps {
  members: Member[];
  isUpdating: Set<string>;
  selectedServer: Server;
  onNicknameChange: (index: number, nickname: string) => void;
  onApplyNickname: (userId: string, nickname: string) => void;
  isApplyingAll: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  showCheckboxes: boolean;

  isInitialLoad?: boolean;
  onNicknameSwap?: (
    fromUserId: string,
    toUserId: string,
    fromNickname: string,
    toNickname: string
  ) => void;
}

export function UserList({
  members,
  isUpdating,
  selectedServer,
  onNicknameChange,
  onApplyNickname,
  isApplyingAll,
  onSelectionChange,
  showCheckboxes,
  isInitialLoad = true,
  onNicknameSwap,
}: UserListProps) {
  const [animationKey, setAnimationKey] = useState(0);
  const [displayServer, setDisplayServer] = useState(selectedServer);
  const [isLoading, setIsLoading] = useState(isInitialLoad);

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

  useEffect(() => {
    if (selectedServer !== displayServer || isInitialLoad) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setDisplayServer(selectedServer);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [selectedServer, displayServer, isInitialLoad]);

  const handleNicknameSwap = (
    fromUserId: string,
    toUserId: string,
    fromNickname: string,
    toNickname: string
  ) => {
    const fromIndex = members.findIndex((m) => m.user_id === fromUserId);
    const toIndex = members.findIndex((m) => m.user_id === toUserId);

    if (fromIndex !== -1 && toIndex !== -1) {
      onNicknameChange(fromIndex, toNickname);
      onNicknameChange(toIndex, fromNickname);

      if (onNicknameSwap) {
        onNicknameSwap(fromUserId, toUserId, fromNickname, toNickname);
      }
    }
  };

  if (isLoading) {
    return (
      <div className={`${styles.scrollContainer} ${styles.loadingContainer}`}>
        <div className={styles.loadingContent}>
          <Loader2 className={styles.loadingSpinner} />
          <p className={styles.loadingText}>Refreshing Members...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key={displayServer.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={styles.scrollContainer}
    >
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          {showCheckboxes && (
            <motion.div
              variants={checkboxContainerVariants}
              initial="hidden"
              animate={showCheckboxes ? "visible" : "hidden"}
              className={styles.checkboxContainer}
            >
              <Checkbox
                className={styles.checkbox}
                checked={areAllMembersSelected()}
                onCheckedChange={handleGlobalCheckboxChange}
              />
            </motion.div>
          )}
          {showCheckboxes && (
            <span className={styles.selectAllText}>Select All</span>
          )}
        </div>

        <VirtualizerList
          members={members}
          isUpdating={isUpdating}
          selectedServer={displayServer}
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
          onNicknameSwap={handleNicknameSwap}
        />
      </div>
    </motion.div>
  );
}

export default UserList;
