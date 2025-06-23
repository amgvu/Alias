/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import { UsersRound, Palette } from "lucide-react";
import { Member, Arc, Server, Category } from "@/types/types";
import GroupsPanel from "./groups/GroupsPanel";
import Image from "next/image";
import DSMenu from "@/components/ui/Menu/Menu";
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
  servers: Server[];
  handleServerSelection: (server: Server) => void;
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
  servers,
  handleServerSelection,
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
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const tools = [
    { icon: UsersRound, name: "Groups", id: "Groups" },
    { icon: Palette, name: "AI", id: "AI" },
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
          className="fixed mt-6 z-4"
        >
          {renderToolPanel()}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        <Sidebar className="bg-sidebar mt-6 border-border w-20">
          <SidebarHeader
            className={`
          bg-sidebar z-50 border-border
          flex items-center ${
            isMinimized ? "justify-center" : "justify-center"
          } px-2.5
        `}
          >
            <div className="flex border-b pb-3 border-border items-center">
              <Image
                src={selectedServer ? selectedServer.iconURL : "/Arclify.svg"}
                width="36"
                height="36"
                alt="logo"
                className="inline-block w-10 h-10 rounded-lg ring-zinc-800"
              />
            </div>

            {!isMinimized && (
              <div className="absolute">
                <DSMenu
                  items={servers}
                  setSelectedItem={handleServerSelection}
                />
              </div>
            )}
          </SidebarHeader>
          <SidebarContent className="">
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
                          className={`text-sm z-8 sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] w-12 h-12 flex items-center justify-center rounded-lg transition-colors duration-200 ${
                            isActive
                              ? "bg-button-hover text-text-primary"
                              : "text-text-secondary hover:bg-transparent-button-hover-context-bar"
                          }`}
                        >
                          <IconComponent
                            size={20}
                            className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6"
                          />
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
