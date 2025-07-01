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
import {
  DashboardLayout,
  ServerContent,
  AuthCard,
  Sidebar,
  NavigationTopbar,
} from "@/components";
import { LoaderCircle } from "lucide-react";

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
    setMembers,
    applyNicknamesToSelection,
  } = useMemberManagement(selectedServer, fetchedMembers);

  const {
    category,
    categoryItems,
    setCategory,
    theme,
    setTheme,
    loading,
    handleGenerateCharacters,
  } = useThemeGenerator(members, setMembers);

  const { selectedArc, setSelectedArc, handleCreateGroup } = useArcManagement(
    selectedServer,
    members,
    setMembers
  );

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  useEffect(() => {
    setShowCheckboxes(false);
  }, [selectedServer]);

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
      menubar={
        <Sidebar
          selectedServer={selectedServer}
          servers={servers}
          handleServerSelection={handleServerSelection}
          selectedArc={selectedArc}
          setSelectedArc={setSelectedArc}
          members={members}
          category={category}
          categoryItems={categoryItems}
          setCategory={setCategory}
          theme={theme}
          setTheme={setTheme}
          loading={loading}
          handleGenerateCharacters={handleGenerateCharacters}
          selectedUserIds={selectedUserIds}
          handleCreateGroup={(groupName: string, selectedMembers: Member[]) =>
            handleCreateGroup(groupName, selectedMembers)
          }
        />
      }
      authcard={<AuthCard />}
    >
      <NavigationTopbar className="" selectedServer={selectedServer} />

      <ServerContent
        selectedServer={selectedServer}
        serversError={serversError}
        membersError={membersError}
        members={members}
        isUpdating={isUpdating}
        isApplyingAll={isApplyingAll}
        onNicknameChange={handleNicknameChange}
        onApplyNickname={(
          userId: string,
          nickname: string,
          globalName: string
        ) => handleUpdateNickname(userId, nickname, globalName, true)}
        onApplyToSelection={applyNicknamesToSelection}
        onSelectionChange={setSelectedUserIds}
        showCheckboxes={showCheckboxes}
        setShowCheckboxes={setShowCheckboxes}
        selectedUserIds={selectedUserIds}
        isLoaded={isLoaded}
      />
    </DashboardLayout>
  );
}
