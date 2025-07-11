"use client";
import { motion } from "motion/react";
import UserCard from "@/components/ui/UserCard/UserCard";
import { Checkbox } from "@/components/ui/checkbox";
import {
  swapVariants,
  shiftVariants,
  checkboxContainerVariants,
} from "@/lib/data";

import { MemberItemProps } from "@/components/app/ServerContent/UserList/MemberItem.types";

export default function MemberItem({
  member,
  memberIndex,
  originalIndex,
  isSelected,
  showCheckboxes,
  isUpdating,
  selectedServer,
  onCheckboxToggle,
  onUpdateNicknameLocally,
  onApplyNickname,
  isSwapped = false,
  swapAnimationKey = 0,
}: MemberItemProps) {
  return (
    <motion.div
      key={`${member.user_id}-${swapAnimationKey}`}
      className="relative"
      custom={memberIndex}
      initial="initial"
      variants={shiftVariants}
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
          <UserCard
            member={member}
            selectedServer={selectedServer}
            isUpdating={isUpdating}
            onUpdateNicknameLocally={(nickname) =>
              onUpdateNicknameLocally(originalIndex, nickname)
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
