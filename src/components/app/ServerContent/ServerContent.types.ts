import { Server, Member } from "@/types/types";

export interface ServerContentProps {
  selectedServer: Server | null;
  serversError: string | null;
  membersError: string | null;
  fetchedMembers: Member[];
  isUpdating: Set<string>;
  onUpdateNicknameLocally: (index: number, nickname: string) => void;
  onApplyNickname: (
    userId: string,
    nickname: string,
    globalName: string
  ) => void;
  onUpdateSelectedNicknames: (selectedMembers: Member[]) => void;
  onSelectedUserIds?: (selectedIds: string[]) => void;
  showCheckboxes: boolean;
  selectedUserIds: string[];
  setShowCheckboxes: (show: boolean) => void;
  isPageLoaded: boolean;
}

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

export interface UserListProps {
  fetchedMembers: Member[];
  isUpdating: Set<string>;
  selectedServer: Server;
  onUpdateNicknameLocally: (index: number, nickname: string) => void;
  onApplyNickname: (
    userId: string,
    nickname: string,
    globalName: string
  ) => void;
  onSelectedUserIds?: (selectedIds: string[]) => void;
  showCheckboxes: boolean;
  isInitialLoad?: boolean;
  onNicknameSwap?: (
    fromUserId: string,
    toUserId: string,
    fromNickname: string,
    toNickname: string
  ) => void;
}

export interface RoleHeaderProps {
  roleName: string;
  showCheckboxes: boolean;
  isAllSelected: boolean;
  onCheckboxChange: () => void;
}

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
