"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Member } from "@/types/types";
import {
  useServerSelection,
  useMembers,
  useMemberManagement,
  useThemeGenerator,
  useArcManagement,
  useAuth,
} from "@/lib/hooks";
import { DashboardLayout, ServerContent } from "@/components";
import { LoaderCircle } from "lucide-react";
import { NavigationSidebar } from "@/components/dashboard/nav-sidebar/NavigationSidebar";
import { NavigationTopBar } from "@/components/dashboard/nav-sidebar/NavigationTopbar";
import Menubar from "@/components/dashboard/menubar/Menubar";

export default function Dashboard() {
  const { session, status } = useAuth();
  const { servers, serversError, selectedServer, handleServerSelection } =
    useServerSelection();

  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const { members: fetchedMembers, error: membersError } = useMembers(
    selectedServer?.id ?? ""
  );

  const {
    members,
    isUpdating,
    isApplyingAll,
    handleNicknameChange,
    handleUpdateNickname,
    applyAllNicknames,
    setMembers,
    applyNicknamesToSelection,
  } = useMemberManagement(selectedServer, fetchedMembers);

  const {
    category,
    setCategory,
    theme,
    setTheme,
    loading,
    handleGenerateCharacters,
  } = useThemeGenerator(members, setMembers);

  const {
    selectedArc,
    setSelectedArc,
    isSavingArc,
    handleSaveArc,
    handleCreateNewArc,
    handleCreateGroup,
  } = useArcManagement(selectedServer, members, setMembers);

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [activeSection, setActiveSection] = useState("server");

  useEffect(() => {
    setShowCheckboxes(false);
  }, [selectedServer]);

  const categories = [
    "Fictional Characters",
    "Real People",
    "Objects",
    "Places",
    "Abstract Concepts",
  ];

  useEffect(() => {
    if (status !== "loading") {
      setShowLoading(false);
      setIsLoaded(true);
    }
  }, [status]);

  if (showLoading || status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: 0.1 }}
        >
          <LoaderCircle className="text-zinc-300 animate-spin h-24 w-24" />
        </motion.div>
      </div>
    );
  }

  if (!session) {
    return <div>Redirecting to sign-in...</div>;
  }

  return (
    <DashboardLayout
      sidebar={
        <Menubar
          selectedServer={selectedServer}
          selectedArc={selectedArc}
          setSelectedArc={setSelectedArc}
          handleCreateNewArc={handleCreateNewArc}
          applyAllNicknames={applyAllNicknames}
          isApplyingAll={isApplyingAll}
          isSavingArc={isSavingArc}
          handleSaveArc={handleSaveArc}
          members={members}
          category={category}
          setCategory={setCategory}
          theme={theme}
          setTheme={setTheme}
          loading={loading}
          handleGenerateCharacters={handleGenerateCharacters}
          categories={categories}
          onApplyToSelection={applyNicknamesToSelection}
          selectedUserIds={selectedUserIds}
          showCheckboxes={showCheckboxes}
          setShowCheckboxes={setShowCheckboxes}
          handleCreateGroup={(groupName: string, selectedMembers: Member[]) =>
            handleCreateGroup(groupName, selectedMembers)
          }
        />
      }
    >
      <NavigationTopBar className="" selectedServer={selectedServer} />
      <div className="z-50">
        <NavigationSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          servers={servers}
          selectedServer={selectedServer}
          handleServerSelection={handleServerSelection}
        />
      </div>
      <div
        className={`flex-1 transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex justify-between items-center"></div>
        <ServerContent
          selectedServer={selectedServer}
          serversError={serversError}
          membersError={membersError}
          members={members}
          isUpdating={isUpdating}
          isApplyingAll={isApplyingAll}
          onNicknameChange={handleNicknameChange}
          onApplyNickname={(userId: string, nickname: string) =>
            handleUpdateNickname(userId, nickname, true)
          }
          onApplyToSelection={applyNicknamesToSelection}
          onSelectionChange={setSelectedUserIds}
          showCheckboxes={showCheckboxes}
          setShowCheckboxes={setShowCheckboxes}
        />
      </div>
    </DashboardLayout>
  );
}
