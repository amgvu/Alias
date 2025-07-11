import { Member, Server } from "@/types/types";

export interface MemberItemProps {
  member: Member;
  memberIndex: number;
  originalIndex: number;
  isSelected: boolean;
  showCheckboxes: boolean;
  isUpdating: Set<string>;
  selectedServer: Server | null;
  onCheckboxToggle: (userId: string) => void;
  onUpdateNicknameLocally: (index: number, nickname: string) => void;
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
  isSwapped?: boolean;
  swapAnimationKey?: number;
}
