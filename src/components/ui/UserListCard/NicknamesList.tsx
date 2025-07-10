import { motion, AnimatePresence } from "framer-motion";
import { Member, Server } from "@/types/types";
import { Loader2, X } from "lucide-react";
import { useUserListCard } from "@/lib/hooks";
import { styles } from "@/components/ui/UserListCard/UserListCard.styles";

interface NicknamesListProps {
  member: Member;
  isUpdating: Set<string>;
  selectedServer: Server | null;
  onUpdateNicknameLocally: (nickname: string) => void;
  onApplyNickname: () => void;
  handleExpansionToggle: () => void;
}

export default function NicknamesList({
  member,
  selectedServer,
  onUpdateNicknameLocally,
  onApplyNickname,
  handleExpansionToggle,
}: NicknamesListProps) {
  const {
    previousNicknames,
    isLoadingNicknames,
    fetchError,
    deletingNicknames,

    handleNicknameSelect: localHandleNicknameSelect,
    handleNicknameDeleteWithDelay,
  } = useUserListCard({
    member,
    selectedServer: selectedServer?.id ?? "",
    onUpdateNicknameLocally,
    onApplyNickname,
  });

  const handleNicknameSelectAndClose = (nickname: string) => {
    localHandleNicknameSelect(nickname);
    handleExpansionToggle();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1 }}
      transition={{ duration: 0.1 }}
      className={styles.expandedSection.container}
    >
      <div className={styles.expandedSection.content}>
        <button
          onClick={handleExpansionToggle}
          className={styles.expandedSection.closeButton}
        >
          <X className={styles.expandedSection.closeIcon} />
        </button>
        <div className={styles.expandedSection.title}>Saved Nicknames</div>
        {isLoadingNicknames ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.expandedSection.loadingText}
          >
            <Loader2 className={styles.expandedSection.loadingIcon} />
            <span>Loading nicknames...</span>
          </motion.div>
        ) : fetchError ? (
          <div className={styles.expandedSection.errorText}>{fetchError}</div>
        ) : previousNicknames.length === 0 ? (
          <div className={styles.expandedSection.emptyText}>
            No nicknames found. Add some!
          </div>
        ) : (
          <div className={styles.expandedSection.nicknamesContainer}>
            <div className={styles.expandedSection.nicknamesList}>
              {previousNicknames.map((nickname) => (
                <AnimatePresence key={`${nickname.nickname}`}>
                  {!deletingNicknames.includes(nickname.nickname) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={styles.expandedSection.nicknameItem}
                    >
                      <button
                        onClick={() =>
                          handleNicknameSelectAndClose(nickname.nickname)
                        }
                        className={styles.expandedSection.nicknameButton}
                      >
                        {nickname.nickname}
                      </button>
                      <button
                        onClick={() => handleNicknameDeleteWithDelay(nickname)}
                        className={styles.expandedSection.deleteButton}
                      >
                        <X className={styles.expandedSection.deleteIcon} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
