"use client";

import { useState, useEffect } from "react";
import {
  LoaderPinwheel,
  ChevronsUpDown,
  WandSparkles,
  CheckCheck,
  SaveAll,
} from "lucide-react";
import {
  DSButton,
  DSMenu,
  DSUserList,
  DSCreateMenu,
  DSInput,
} from "@/components";
import {
  useServerSelection,
  useMembers,
  useMemberManagement,
  useThemeGenerator,
  useArcManagement,
  useAuth,
} from "@/lib/hooks";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { session, status } = useAuth();
  const {
    servers,
    serversError,
    selectedServer,
    selectedServerName,
    handleServerSelection,
  } = useServerSelection();

  const [isLoaded, setIsLoaded] = useState(false);
  const { members: fetchedMembers, error: membersError } =
    useMembers(selectedServer);

  const {
    members,
    isUpdating,
    isApplyingAll,
    handleNicknameChange,
    handleUpdateNickname,
    applyAllNicknames,
    setMembers,
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
  } = useArcManagement(selectedServer, members, setMembers);

  const categories = [
    "Fictional Characters",
    "Real People",
    "Objects",
    "Places",
    "Abstract Concepts",
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Redirecting to sign-in...</div>;
  }

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] text-white bg-background">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          <div className="">
            <div
              className={`w-auto transition-opacity duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="text-center font-bold font-[family-name:var(--font-geist-sans)]"></div>
              </div>

              <div className="flex flex-col">
                <div className="text-4xl text-zinc-600 font-semibold text-center py-2"></div>
                <div className="justify-items-center">
                  {serversError || membersError ? (
                    <div className="mb-3 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400">
                      {serversError || membersError}
                    </div>
                  ) : selectedServer ? (
                    <DSUserList
                      selectedServer={selectedServer}
                      members={members}
                      isUpdating={isUpdating}
                      onNicknameChange={handleNicknameChange}
                      onApplyNickname={(userId: string, nickname: string) =>
                        handleUpdateNickname(userId, nickname, true)
                      }
                      isApplyingAll={isApplyingAll}
                    />
                  ) : (
                    <div className="text-center font-semibold text-4xl text-zinc-700 py-5">
                      Select a server to view and manage members
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="drawer-side">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="menu bg-zinc-950 border-r border-t border-[#252525] min-h-full h-23 w-80 p-4"
          >
            <div>
              <div className="space-y-6 mt-3">
                <div className="rounded-md">
                  <label className="block text-lg text-zinc-200 font-medium mb-3">
                    My Servers
                  </label>
                  <DSMenu
                    items={servers.map((server) => server.name)}
                    placeholder="Select a server"
                    selectedItem={selectedServerName}
                    setSelectedItem={handleServerSelection}
                  />
                </div>
                <div className="rounded-md">
                  <label className="block text-lg text-zinc-200 font-medium mb-3">
                    Nickname Sets
                  </label>
                  <DSCreateMenu
                    selectedServer={selectedServer}
                    selectedArc={selectedArc}
                    setSelectedArc={setSelectedArc}
                    onCreateNewArc={handleCreateNewArc}
                  />
                </div>
                <div>
                  <ul>
                    <div className="flex justify-end space-x-4">
                      <DSButton
                        onClick={applyAllNicknames}
                        className="bg-zinc-800 disabled:bg-zinc-900 disabled:text-zinc-500 border border-zinc-700 text-zinc-100 font-medium hover:bg-zinc-700"
                        disabled={
                          isApplyingAll ||
                          !selectedServer ||
                          members.length === 0
                        }
                      >
                        <CheckCheck className="w-4 h-4 mr-[-2px]" />
                        {isApplyingAll ? "Applying..." : "Apply All"}
                      </DSButton>
                      <DSButton
                        onClick={handleSaveArc}
                        className="bg-zinc-800 font-medium disabled:bg-zinc-900 disabled:text-zinc-500 border border-zinc-700 text-zinc-100 hover:bg-zinc-700"
                        disabled={
                          isSavingArc ||
                          !selectedServer ||
                          !selectedArc ||
                          members.length === 0
                        }
                      >
                        <SaveAll className="w-4 h-4 mr-[-2px]" />
                        {isSavingArc ? "Saving..." : "Save Set"}
                      </DSButton>
                    </div>
                  </ul>
                </div>

                <div className="border-t border-[#252525] pt-4">
                  <label className="inline-block text-zinc-200 text-lg font-medium">
                    Name Generator
                  </label>
                  <h2 className="inline-block mx-2 font-light text-zinc-500">
                    v0.2
                  </h2>
                  <h3 className="font-light mt-1 text-sm text-zinc-400">
                    Generate names for your members based on a theme and apply
                    them within seconds.
                  </h3>

                  <div className="mt-4">
                    <button
                      className="flex items-center gap-1 py-1 text-zinc-200 transition-all text-md cursor-pointer relative"
                      onClick={() =>
                        setCategory((current) => {
                          const currentIndex = categories.indexOf(current);
                          const nextIndex =
                            (currentIndex + 1) % categories.length;
                          return categories[nextIndex];
                        })
                      }
                    >
                      <ChevronsUpDown className="w-3 h-3 opacity-70 flex-shrink-0" />
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={category}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.1, ease: "easeInOut" }}
                          className="hover:text-zinc-400 inline-block"
                        >
                          {category}
                        </motion.span>
                      </AnimatePresence>
                    </button>
                    <DSInput
                      className="transition-all bg-black border text-zinc-100 rounded-lg border-[#252525]"
                      placeholder="Enter a movie, game, thing, etc"
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                    />
                    <div className="flex justify-end space-x-4 mt-3">
                      <DSButton
                        onClick={handleGenerateCharacters}
                        className={`transition-all bg-[#ededed] ${
                          !loading && "disabled:bg-zinc-900"
                        } bg-zinc-800 disabled:text-zinc-500 border border-zinc-700 text-zinc-100 font-medium hover:bg-zinc-700`}
                        disabled={
                          loading || !selectedServer || members.length === 0
                        }
                      >
                        <WandSparkles className="w-4 h-4 mr-[-2px]" />
                        {loading ? (
                          <LoaderPinwheel className="animate-spin w-5 h-5 text-zinc-100" />
                        ) : (
                          "Generate"
                        )}
                      </DSButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
