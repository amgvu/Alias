import { Member, Server } from "@/types/types";

export interface ToolbarProps {
  members: Member[];
  onUpdateSelectedNicknames: (selectedMembers: Member[]) => void;
  selectedUserIds: string[];
  selectedServer: Server | null;
  showCheckboxes: boolean;
  setShowCheckboxes: (show: boolean) => void;
}

export interface SelectionToolProps {
  selectedServer: Server | null;
  showCheckboxes: boolean;
  setShowCheckboxes: (show: boolean) => void;
}

export interface ApplyToolProps {
  members: Member[];
  onUpdateSelectedNicknames: (selectedMembers: Member[]) => void;
  selectedUserIds: string[];
  selectedServer: Server | null;
}
