import { Member, Server } from "@/types/types";

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
