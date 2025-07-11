import { Member, Server, Nickname } from "@/types/types";

export interface NicknamesListProps {
  member: Member;
  isUpdating: Set<string>;
  selectedServer: Server | null;
  onUpdateNicknameLocally: (nickname: string) => void;
  onApplyNickname: () => void;
  handleExpansionToggle: () => void;
  previousNicknames: Nickname[];
  isLoadingNicknames: boolean;
  fetchError: string | null;
  deletingNicknames: string[];
  handleNicknameSelectAndClose: (nickname: string) => void;
  handleNicknameDeleteWithDelay: (nickname: Nickname) => void;
}
