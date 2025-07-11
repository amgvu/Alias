"use client";
import { motion } from "framer-motion";
import { styles } from "../UserCard/UserCard.styles";
import { ArrowDownUp } from "lucide-react";

import { DragOverlayProps } from "@/components/ui/dnd/useDnd.types";

export default function DragOverlay({ displayValue }: DragOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.dragOverlay.container}>
        <div className={styles.dragOverlay.text}>
          <ArrowDownUp className={styles.dragOverlay.icon} />
          {displayValue}
        </div>
      </div>
    </motion.div>
  );
}
