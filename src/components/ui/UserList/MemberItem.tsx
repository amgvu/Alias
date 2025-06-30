import { motion } from "motion/react";
import { Member } from "@/types/types";
import { UserListCard } from "@/components";
import { Checkbox } from "../checkbox";
import { Server } from "@/types/types";
interface MemberItemProps {
  member: Member;
  memberIndex: number;
  originalIndex: number;
  isSelected: boolean;
  showCheckboxes: boolean;
  isUpdating: Set<string>;
  selectedServer: Server | null;
  isApplyingAll: boolean;
  animationKey: number;
  onCheckboxToggle: (userId: string) => void;
  onNicknameChange: (index: number, nickname: string) => void;
  onApplyNickname: (
    userId: string,
    nickname: string,
    globalName: string
  ) => void;
  onNicknameSwap?: (
    fromUserId: string,
    toUserId: string,
    fromNickname: string,
    toNickname: string
  ) => void;
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
  isSwapped?: boolean;
  swapAnimationKey?: number;
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

const swapVariants = {
  initial: {
    scale: 1,
  },
  swap: {
    y: [0, 4, 0],
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
      times: [0, 0.5, 1],
    },
  },
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
  isSwapped = false,
  swapAnimationKey = 0,
}: MemberItemProps) {
  return (
    <motion.div
      key={`${member.user_id}-${animationKey}-${swapAnimationKey}`}
      className="relative"
      custom={memberIndex}
      initial="initial"
      variants={shiftVariants}
      animate={isApplyingAll ? "animate" : "initial"}
    >
      <motion.div
        className="flex items-center rounded-md"
        variants={swapVariants}
        initial="initial"
        animate={isSwapped ? "swap" : "initial"}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          variants={checkboxContainerVariants}
          initial="hidden"
          animate={showCheckboxes ? "visible" : "hidden"}
          className="overflow-hidden flex-shrink-0"
        >
          <Checkbox
            className="border-zinc-500 bg-transparent cursor-pointer transition-all"
            checked={isSelected}
            onCheckedChange={() => onCheckboxToggle(member.user_id)}
          />
        </motion.div>

        <motion.div
          className="flex-1"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <UserListCard
            member={member}
            selectedServer={selectedServer}
            isUpdating={isUpdating}
            isApplyingAll={isApplyingAll}
            onNicknameChange={(nickname) =>
              onNicknameChange(originalIndex, nickname)
            }
            onApplyNickname={() =>
              onApplyNickname(
                member.user_id,
                member.nickname,
                member.globalName
              )
            }
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
