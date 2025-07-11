import { Member, Server, Arc, ArcNickname } from "@/types/types";

export interface GroupsPanelProps {
  members: Member[];
  selectedServer: Server | null;
  selectedArc: Arc | null;
  newArcName: string;
  arcs: Arc[];
  arcNicknamesMap: Record<number, ArcNickname[]>;
  removingArcIds: number[];
  arcMemberCounts: Record<number, number>;
  isLoading: boolean;
  alertDialog: {
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel?: () => void;
  };
  setNewArcName: (name: string) => void;
  setSelectedArc: (arc: Arc | null) => void;
  setAlertDialog: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      title: string;
      description: string;
      onConfirm: () => void;
      onCancel?: () => void;
    }>
  >;
  handleCreateClick: () => Promise<void>;
  handleDeleteArc: (arcId: number) => Promise<void>;
  handleCreateGroup: (
    groupName: string,
    selectedMembers: Member[]
  ) => Promise<void>;
}
