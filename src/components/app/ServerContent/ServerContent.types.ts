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
