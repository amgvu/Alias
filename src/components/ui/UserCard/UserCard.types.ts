import { Member, Server } from "@/types/types";

export interface UserCardProps {
  member: Member;
  isUpdating: Set<string>;
  selectedServer: Server | null;
  onUpdateNicknameLocally: (nickname: string) => void;
  onApplyNickname: () => void;
  isDragOverlay?: boolean;
}
