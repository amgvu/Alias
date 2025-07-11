"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar, SidebarFooter } from "@/components/ui/sidebar";
import { Member } from "@/types/types";
import ServerBrowser from "./SidebarChildren/ServerBrowser";
import ToolBrowser from "./SidebarChildren/ToolBrowser";
import GroupsPanel from "./GroupsPanel/GroupsPanel";
import AIPanel from "./AIPanel/AIPanel";

import { MenubarProps } from "@/components/app/SideTopBar/Sidebar.types";

export default function Menubar({
  selectedServer,
  servers,
  handleServerSelection,
  selectedArc,
  setSelectedArc,
  newArcName,
  setNewArcName,
  alertDialog,
  setAlertDialog,
  members,
  category,
  categoryItems,
  setCategory,
  theme,
  setTheme,
  loading,
  handleGenerate,
  randomCategory,
  randomPrompt,
  selectedUserIds = [],
  handleCreateGroup,
  arcs,
  arcNicknamesMap,
  removingArcIds,
  arcMemberCounts,
  isLoading,
  handleCreateClick,
  handleDeleteArc,
}: MenubarProps) {
  const [activeTool, setActiveTool] = useState<string>("Groups");

  const renderToolPanel = () => {
    switch (activeTool) {
      case "Groups":
        return (
          <GroupsPanel
            selectedServer={selectedServer}
            selectedArc={selectedArc}
            newArcName={newArcName}
            arcs={arcs}
            arcNicknamesMap={arcNicknamesMap}
            removingArcIds={removingArcIds}
            arcMemberCounts={arcMemberCounts}
            isLoading={isLoading}
            setNewArcName={setNewArcName}
            setSelectedArc={setSelectedArc}
            members={members}
            handleCreateClick={handleCreateClick}
            handleDeleteArc={handleDeleteArc}
            handleCreateGroup={(groupName: string, selectedMembers: Member[]) =>
              handleCreateGroup(groupName, selectedMembers)
            }
            alertDialog={alertDialog}
            setAlertDialog={setAlertDialog}
          />
        );
      case "Themes":
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
            handleGenerate={handleGenerate}
            randomCategory={randomCategory}
            categoryItems={categoryItems}
            randomPrompt={randomPrompt}
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
        <Sidebar className="bg-sidebar mt-6 border-border w-[82px]">
          <ToolBrowser activeTool={activeTool} setActiveTool={setActiveTool} />
          <ServerBrowser
            selectedServer={selectedServer}
            servers={servers}
            handleServerSelection={handleServerSelection}
          />
          <SidebarFooter className="p-3 border-border"></SidebarFooter>
        </Sidebar>
      </motion.div>
    </div>
  );
}
