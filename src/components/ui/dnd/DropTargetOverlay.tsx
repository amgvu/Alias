import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../UserListCard/UserListCard.styles";

interface DropTargetOverlayProps {
  isDropTarget: boolean;
}

export default function DropTargetOverlay({
  isDropTarget,
}: DropTargetOverlayProps) {
  return (
    <AnimatePresence>
      {isDropTarget && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.dropTarget.overlay}
        ></motion.div>
      )}
    </AnimatePresence>
  );
}
