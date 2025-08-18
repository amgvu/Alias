import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";

import { styles } from "@/components/ui/UserCard/UserCard.styles";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ActionButtonsProps } from "@/components/ui/UserCard/UserCard.types";

export default function ActionButtons({
  showOverlay,
  inputValue,
  showResetSuccess,
  handleRevert,
  handleApplyNickname,
}: ActionButtonsProps) {
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
              <FaCheck className={styles.buttonSection.buttonIcon} />
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleRevert}
                disabled={showOverlay}
                className={styles.resetButton}
              >
                <FaArrowRotateLeft
                  className={styles.buttonSection.buttonIcon}
                />
                Reset
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Resets to global username</p>
            </TooltipContent>
          </Tooltip>
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
            <FaCheck className={styles.buttonSection.successIcon} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
