"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "./UserList.styles";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useCheckboxSelection } from "@/lib/hooks";
import VirtualizerList from "./VirtualizerList";

import { UserListProps } from "@/components/app/ServerContent/ServerContent.types";

export function UserList({
  fetchedMembers,
  isUpdating,
  selectedServer,
  onUpdateNicknameLocally,
  onApplyNickname,
  onSelectedUserIds,
  showCheckboxes,
  isInitialLoad = true,
  onNicknameSwap,
}: UserListProps) {
  const [displayServer, setDisplayServer] = useState(selectedServer);
  const [isLoading, setIsLoading] = useState(isInitialLoad);

  const {
    selectedUserIdSets,
    areAllMembersSelected,
    areAllRoleMembersSelected,
    handleCheckboxToggle,
    handleGlobalCheckboxChange,
    handleRoleCheckboxChange,
    checkboxContainerVariants,
  } = useCheckboxSelection({
    fetchedMembers,
    onSelectedUserIds,
  });

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
    const fromIndex = fetchedMembers.findIndex((m) => m.user_id === fromUserId);
    const toIndex = fetchedMembers.findIndex((m) => m.user_id === toUserId);

    if (fromIndex !== -1 && toIndex !== -1) {
      onUpdateNicknameLocally(fromIndex, toNickname);
      onUpdateNicknameLocally(toIndex, fromNickname);

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
          members={fetchedMembers}
          isUpdating={isUpdating}
          selectedServer={displayServer}
          showCheckboxes={showCheckboxes}
          selectedUserIdSets={selectedUserIdSets}
          onUpdateNicknameLocally={onUpdateNicknameLocally}
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
