import { Server, Arc, Member, Category, ArcNickname } from "@/types/types";

export interface MenubarProps {
  selectedServer: Server | null;
  servers: Server[];
  handleServerSelection: (server: Server) => void;
  selectedArc: Arc | null;
  setSelectedArc: (arc: Arc | null) => void;
  newArcName: string;
  setNewArcName: (name: string) => void;
  members: Member[];
  category: string;
  categoryItems: Category[];
  setCategory: (category: string | ((current: string) => string)) => void;
  theme: string;
  setTheme: (theme: string) => void;
  loading: boolean;
  handleGenerate: () => void;
  randomCategory: () => void;
  randomPrompt: (categoryId: string) => void;
  selectedUserIds?: string[];
  handleCreateGroup: (
    groupName: string,
    selectedMembers: Member[]
  ) => Promise<void>;
  alertDialog: {
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel?: () => void;
  };
  setAlertDialog: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      title: string;
      description: string;
      onConfirm: () => void;
      onCancel?: () => void;
    }>
  >;
  arcs: Arc[];
  arcNicknamesMap: Record<number, ArcNickname[]>;
  removingArcIds: number[];
  arcMemberCounts: Record<number, number>;
  isLoading: boolean;
  handleCreateClick: () => Promise<void>;
  handleDeleteArc: (arcId: number) => Promise<void>;
}

export interface ServerBrowserProps {
  selectedServer: Server | null;
  servers: Server[];
  handleServerSelection: (server: Server) => void;
}

export interface ToolBrowserProps {
  activeTool: string;
  setActiveTool: (toolId: string) => void;
}
