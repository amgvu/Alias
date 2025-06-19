/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion";
import {
  Search,
  FileText,
  Image,
  Settings,
  Calculator,
  Code,
  Palette,
  Database,
  MessageSquare,
  Upload,
  Users,
  Zap,
  UsersRound,
  Sparkles,
  ReplaceAll,
  History,
} from "lucide-react";
import { Member, Arc, Server } from "@/types/types";
import { NicknamesPanel } from "./NicknamesPanel";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

interface MenubarProps {
  selectedServer: Server | null;
  selectedArc: Arc | null;
  setSelectedArc: (arc: Arc | null) => void;
  handleCreateNewArc: (newArcName: string) => void;
  applyAllNicknames: () => void;
  isApplyingAll: boolean;
  isSavingArc: boolean;
  handleSaveArc: () => void;
  members: Member[];
  category: string;
  setCategory: (category: string | ((current: string) => string)) => void;
  theme: string;
  setTheme: (theme: string) => void;
  loading: boolean;
  handleGenerateCharacters: (selectedMembers: Member[]) => void;
  categories: string[];
  onApplyToSelection: (selectedMembers: Member[]) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  selectedUserIds?: string[];
  showCheckboxes: boolean;
  setShowCheckboxes: (show: boolean) => void;
}

export default function Menubar({
  selectedServer,
  selectedArc,
  setSelectedArc,
  handleCreateNewArc,
  isApplyingAll,
  isSavingArc,
  handleSaveArc,
  members,
  category,
  setCategory,
  theme,
  setTheme,
  loading,
  handleGenerateCharacters,
  categories,
  onApplyToSelection,
  selectedUserIds = [],
  showCheckboxes,
  setShowCheckboxes,
}: MenubarProps) {
  const tools = [
    { icon: UsersRound, name: "Groups", id: "Groups" },
    { icon: Sparkles, name: "AI", id: "AI" },
    { icon: ReplaceAll, name: "Apply", id: "Apply" },
    { icon: History, name: "History", id: "History" },
  ];

  const handleToolClick = (toolId: string) => {
    console.log(`Selected tool: ${toolId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <Sidebar className="bg-context-bar translate-x-64 mt-6 border-border w-14">
        <SidebarContent className="py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2 flex flex-col items-center">
                {tools.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <SidebarMenuItem key={tool.id}>
                      <SidebarMenuButton
                        onClick={() => handleToolClick(tool.id)}
                        className="w-12 h-12 flex items-center justify-center rounded-lg text-text-primary hover:bg-button-hover-transparent transition-colors duration-200"
                      >
                        <IconComponent size={20} />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-3 border-t border-border"></SidebarFooter>
      </Sidebar>
    </motion.div>
  );
}
