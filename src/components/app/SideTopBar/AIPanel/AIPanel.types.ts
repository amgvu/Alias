import { Server, Member, Category } from "@/types/types";

export interface AIPanelProps {
  selectedServer: Server | null;
  members: Member[];
  selectedUserIds: string[];
  category: string;
  categoryItems: Category[];
  setCategory: (category: string | ((current: string) => string)) => void;
  theme: string;
  setTheme: (theme: string) => void;
  loading: boolean;
  handleGenerate: () => void;
  randomCategory: () => void;
  randomPrompt: (categoryId: string) => void;
}
