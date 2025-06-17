import { motion } from "motion/react";
import { Checkbox } from "../checkbox";

interface RoleHeaderProps {
  roleName: string;
  showCheckboxes: boolean;
  isAllSelected: boolean;
  onCheckboxChange: () => void;
  checkboxContainerVariants: {
    hidden: {
      width: number;
      opacity: number;
      x: number;
      transition: { duration: number };
    };
    visible: {
      width: string;
      opacity: number;
      x: number;
      transition: { duration: number };
    };
  };
}

export default function RoleHeader({
  roleName,
  showCheckboxes,
  isAllSelected,
  onCheckboxChange,
  checkboxContainerVariants,
}: RoleHeaderProps) {
  return (
    <div className="flex items-center py-1 ">
      <motion.div
        variants={checkboxContainerVariants}
        initial="hidden"
        animate={showCheckboxes ? "visible" : "hidden"}
        className="overflow-hidden flex-shrink-0"
      >
        <Checkbox
          className="border-zinc-300 bg-transparent cursor-pointer"
          checked={isAllSelected}
          onCheckedChange={onCheckboxChange}
        />
      </motion.div>
      <span className="text-md text-zinc-400 text-sm font-medium ml-2">
        {roleName}
      </span>
    </div>
  );
}
