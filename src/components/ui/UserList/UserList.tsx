import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "./UserList.styles";
import { Checkbox } from "@/components/ui/checkbox";
import { Member } from "@/types/types";
import { Loader2 } from "lucide-react";
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
  isInitialLoad?: boolean;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setShowCheckboxes,
  isInitialLoad = true,
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

  if (isLoading) {
    return (
      <div
        className={`${styles.scrollContainer} flex items-center justify-center`}
      >
        <div className="flex flex-col mt-8 items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
          <p className="text-zinc-500 font-semibold">Refreshing Members...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key={displayServer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={styles.scrollContainer}
    >
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
        />
      </div>
    </motion.div>
  );
}

export default DSUserList;
