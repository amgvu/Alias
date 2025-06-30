import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, RotateCcw } from "lucide-react";
import { styles } from "./UserListCard.styles";
import { useUserListCard } from "./useUserListCard";
import { Button } from "../button";
import { Member, Server } from "@/types/types";

interface ActionButtonsProps {
  member: Member;
  selectedServer: Server | null;
  showOverlay: boolean;
  onNicknameChange: (nickname: string) => void;
  onApplyNickname: () => void;
}

export function ActionButtons({
  member,
  selectedServer,
  showOverlay,
  onNicknameChange,
  onApplyNickname,
}: ActionButtonsProps) {
  const {
    inputValue,
    showResetSuccess,

    handleRevert,
    handleApplyNickname,
  } = useUserListCard({
    member,
    selectedServer: selectedServer?.id ?? "",
    onNicknameChange,
    onApplyNickname,
  });

  return (
    <div className={styles.buttonSection.container}>
      <AnimatePresence mode="wait">
        {showOverlay ? (
          <motion.div
            key="apply-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.buttonSection.loaderContainer}
          >
            <Loader2 className={styles.buttonSection.loader} />
          </motion.div>
        ) : (
          <motion.div
            key="apply-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.buttonSection.buttonWrapper}
          >
            <Button
              onClick={handleApplyNickname}
              disabled={showOverlay || !inputValue}
              className={styles.applyButton}
            >
              <Check className={styles.buttonSection.buttonIcon} />
              Apply
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.buttonSection.resetContainer}>
        <motion.div
          animate={{
            opacity: showResetSuccess ? 0 : 1,
            transition: { duration: 0.1 },
          }}
          className={styles.buttonSection.buttonWrapper}
        >
          <Button
            onClick={handleRevert}
            disabled={showOverlay}
            className={styles.resetButton}
          >
            <RotateCcw className={styles.buttonSection.buttonIcon} />
            Reset
          </Button>
        </motion.div>
        {showResetSuccess && (
          <motion.div
            key="reset-success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.buttonSection.resetSuccess}
          >
            <Check className={styles.buttonSection.successIcon} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
