import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { styles } from "@/components/ui/UserCard/UserCard.styles";

interface LoadingOverlayProps {
  showOverlay: boolean;
}

export default function LoadingOverlay({ showOverlay }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(8px)",
            background: [
              "rgba(0,0,0,0.3)",
              "rgba(0,0,0,0.4)",
              "rgba(0,0,0,0.3)",
            ],
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          transition={{
            duration: 0.25,
            background: {
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            },
          }}
          className={styles.loadingOverlay.container}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotate: -45 }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 15,
              },
            }}
            exit={{
              scale: 0.7,
              opacity: 0,
              rotate: 45,
            }}
          >
            <Loader2 className={styles.loadingOverlay.spinner} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
