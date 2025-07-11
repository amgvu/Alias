import { Member, Server } from "@/types/types";

export interface VirtualizerListProps {
  members: Member[];
  isUpdating: Set<string>;
  selectedServer: Server | null;
  showCheckboxes: boolean;
  selectedUserIdSets: Set<string>;
  onUpdateNicknameLocally: (index: number, nickname: string) => void;
  onApplyNickname: (
    userId: string,
    nickname: string,
    globalName: string
  ) => void;
  onCheckboxToggle: (userId: string) => void;
  onRoleCheckboxChange: (roleName: string) => void;
  areAllRoleMembersSelected: (roleName: string) => boolean;
  onNicknameSwap?: (
    fromUserId: string,
    toUserId: string,
    fromNickname: string,
    toNickname: string
  ) => void;
}
