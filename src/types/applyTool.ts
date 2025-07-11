import { Member, Server } from "@/types/types";

export interface ApplyToolProps {
  members: Member[];
  onUpdateSelectedNicknames: (selectedMembers: Member[]) => void;
  selectedUserIds: string[];
  selectedServer: Server | null;
}
