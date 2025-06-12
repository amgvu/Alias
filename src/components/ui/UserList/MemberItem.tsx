import { motion } from "motion/react";
import { Member } from "@/types/types";

import UserListCard from "../UserListCard/UserListCard";
import { Checkbox } from "../checkbox";

interface MemberItemProps {
  member: Member;
  memberIndex: number;
  originalIndex: number;
  isSelected: boolean;
  showCheckboxes: boolean;
  isUpdating: boolean;
  selectedServer: string;
  isApplyingAll: boolean;
  animationKey: number;
  onCheckboxToggle: (userId: string) => void;
  onNicknameChange: (index: number, nickname: string) => void;
  onApplyNickname: (userId: string, nickname: string) => void;
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

const shiftVariants = {
  initial: { y: 0 },
  animate: (index: number) => ({
    y: [0, 10, 0],
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
      delay: (index % 50) * 0.06,
    },
  }),
};

export default function MemberItem({
  member,
  memberIndex,
  originalIndex,
  isSelected,
  showCheckboxes,
  isUpdating,
  selectedServer,
  isApplyingAll,
  animationKey,
  onCheckboxToggle,
  onNicknameChange,
  onApplyNickname,
  checkboxContainerVariants,
}: MemberItemProps) {
  return (
    <motion.div
      key={`${member.user_id}-${animationKey}`}
      className="relative"
      custom={memberIndex}
      initial="initial"
      variants={shiftVariants}
      animate={isApplyingAll ? "animate" : "initial"}
    >
      <div className="flex items-center py-1">
        <motion.div
          variants={checkboxContainerVariants}
          initial="hidden"
          animate={showCheckboxes ? "visible" : "hidden"}
          className="overflow-hidden flex-shrink-0"
        >
          <Checkbox
            className="border-zinc-500 bg-zinc-950 cursor-pointer transition-all"
            checked={isSelected}
            onCheckedChange={() => onCheckboxToggle(member.user_id)}
          />
        </motion.div>

        <UserListCard
          member={member}
          selectedServer={selectedServer}
          isUpdating={isUpdating}
          isApplyingAll={isApplyingAll}
          onNicknameChange={(nickname) =>
            onNicknameChange(originalIndex, nickname)
          }
          onApplyNickname={() =>
            onApplyNickname(member.user_id, member.nickname)
          }
        />
      </div>
    </motion.div>
  );
}
