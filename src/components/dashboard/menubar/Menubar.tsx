/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import { UsersRound, Sparkles, ReplaceAll, History } from "lucide-react";
import { Member, Arc, Server, Category } from "@/types/types";
import GroupsPanel from "./groups/GroupsPanel";
import AIPanel from "./ai/AIPanel";
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
  categories: Category[];
  setCategory: (category: string | ((current: string) => string)) => void;
  theme: string;
  setTheme: (theme: string) => void;
  loading: boolean;
  handleGenerateCharacters: (selectedMembers: Member[]) => void;

  onApplyToSelection: (selectedMembers: Member[]) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  selectedUserIds?: string[];
  showCheckboxes: boolean;
  setShowCheckboxes: (show: boolean) => void;
  handleCreateGroup: (
    groupName: string,
    selectedMembers: Member[]
  ) => Promise<void>;
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
  categories,
  setCategory,
  theme,
  setTheme,
  loading,
  handleGenerateCharacters,

  onApplyToSelection,
  selectedUserIds = [],
  showCheckboxes,
  setShowCheckboxes,
  handleCreateGroup,
}: MenubarProps) {
  const [activeTool, setActiveTool] = useState<string>("Groups");

  const tools = [
    { icon: UsersRound, name: "Groups", id: "Groups" },
    { icon: Sparkles, name: "AI", id: "AI" },
  ];

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId);
  };

  const renderToolPanel = () => {
    switch (activeTool) {
      case "Groups":
        return (
          <GroupsPanel
            selectedServer={selectedServer}
            selectedArc={selectedArc}
            setSelectedArc={setSelectedArc}
            members={members}
            handleCreateGroup={(groupName: string, selectedMembers: Member[]) =>
              handleCreateGroup(groupName, selectedMembers)
            }
          />
        );
      case "AI":
        return (
          <AIPanel
            selectedServer={selectedServer}
            members={members}
            selectedUserIds={selectedUserIds}
            category={category}
            setCategory={setCategory}
            theme={theme}
            setTheme={setTheme}
            loading={loading}
            handleGenerateCharacters={handleGenerateCharacters}
            categories={categories}
          />
        );
      default:
        return <div></div>;
    }
  };

  return (
    <div className="flex">
      {activeTool && (
        <motion.div
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed mt-6"
        >
          {renderToolPanel()}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        <Sidebar className="bg-context-bar rounded-l-lg translate-x-62 mt-6 border-l border-t border-border w-14">
          <SidebarContent className="py-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2 flex flex-col items-center">
                  {tools.map((tool) => {
                    const IconComponent = tool.icon;
                    const isActive = activeTool === tool.id;
                    return (
                      <SidebarMenuItem key={tool.id}>
                        <SidebarMenuButton
                          onClick={() => handleToolClick(tool.id)}
                          className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors duration-200 ${
                            isActive
                              ? "bg-button-hover text-text-primary"
                              : "text-text-secondary hover:bg-transparent-button-hover-context-bar"
                          }`}
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
          <SidebarFooter className="p-3 border-border"></SidebarFooter>
        </Sidebar>
      </motion.div>
    </div>
  );
}
