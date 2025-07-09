"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Member } from "@/types/types";
import {
  useServers,
  useMembers,
  useMemberManagement,
  useThemeGenerator,
  useArcManagement,
  useCheckboxSelection,
  useAuth,
} from "@/lib/hooks";
import {
  AppLayout,
  ServerContent,
  AuthCard,
  Sidebar,
  Topbar,
} from "@/components";
import { LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Dashboard() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

  const { session, status } = useAuth();

  const { servers, serversError, selectedServer, handleServerSelection } =
    useServers();

  const { members: fetchedMembers, error: membersError } = useMembers(
    selectedServer?.id ?? ""
  );

  const {
    members,
    isUpdating,
    handleUpdateNicknameLocally,
    handleUpdateNickname,
    setMembers,
    handleUpdateSelectedNicknames,
  } = useMemberManagement(selectedServer, fetchedMembers);

  const {
    selectedUserIds,
    showCheckboxes,
    setSelectedUserIds,
    setShowCheckboxes,
  } = useCheckboxSelection({ fetchedMembers: fetchedMembers });

  const {
    category,
    categoryItems,
    theme,
    loading,
    setCategory,
    setTheme,
    handleGenerate,
    randomCategory,
    randomPrompt,
  } = useThemeGenerator(members, setMembers, selectedUserIds);

  const {
    selectedArc,
    arcs,
    newArcName,
    alertDialog,
    arcNicknamesMap,
    removingArcIds,
    arcMemberCounts,
    isLoading,
    setAlertDialog,
    setNewArcName,
    setSelectedArc,
    handleCreateGroup,
    handleCreateClick,
    handleDeleteArc,
  } = useArcManagement(selectedServer, members, setMembers);

  useEffect(() => {
    setShowCheckboxes(false);
  }, [selectedServer, setShowCheckboxes]);

  useEffect(() => {
    if (status !== "loading") {
      setShowLoadingSpinner(false);
      setIsPageLoaded(true);
    }
  }, [status]);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("discord");
    }
  }, [status]);

  if (showLoadingSpinner || status === "loading") {
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
    <AppLayout
      sidebar={
        <Sidebar
          selectedServer={selectedServer}
          servers={servers}
          selectedArc={selectedArc}
          members={members}
          category={category}
          categoryItems={categoryItems}
          theme={theme}
          loading={loading}
          selectedUserIds={selectedUserIds}
          arcs={arcs}
          alertDialog={alertDialog}
          newArcName={newArcName}
          arcNicknamesMap={arcNicknamesMap}
          removingArcIds={removingArcIds}
          arcMemberCounts={arcMemberCounts}
          isLoading={isLoading}
          setSelectedArc={setSelectedArc}
          setCategory={setCategory}
          setTheme={setTheme}
          handleGenerate={handleGenerate}
          randomCategory={randomCategory}
          randomPrompt={randomPrompt}
          setNewArcName={setNewArcName}
          handleCreateClick={handleCreateClick}
          handleDeleteArc={handleDeleteArc}
          handleServerSelection={handleServerSelection}
          handleCreateGroup={(groupName: string, selectedMembers: Member[]) =>
            handleCreateGroup(groupName, selectedMembers)
          }
          setAlertDialog={setAlertDialog}
        />
      }
      topbar={<Topbar selectedServer={selectedServer} />}
      authcard={<AuthCard />}
      servercontent={
        <ServerContent
          selectedServer={selectedServer}
          serversError={serversError}
          membersError={membersError}
          fetchedMembers={members}
          isUpdating={isUpdating}
          selectedUserIds={selectedUserIds}
          isPageLoaded={isPageLoaded}
          showCheckboxes={showCheckboxes}
          onUpdateNicknameLocally={handleUpdateNicknameLocally}
          onApplyNickname={(
            userId: string,
            nickname: string,
            globalName: string
          ) => handleUpdateNickname(userId, nickname, globalName, true)}
          onUpdateSelectedNicknames={handleUpdateSelectedNicknames}
          onSelectedUserIds={setSelectedUserIds}
          setShowCheckboxes={setShowCheckboxes}
        />
      }
    ></AppLayout>
  );
}
