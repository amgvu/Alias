"use client";

import { useState, useEffect } from "react";
import { LoaderPinwheel, ChevronsUpDown } from "lucide-react";
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
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] text-white bg-black">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          <div className="p-4">
            <div
              className={`w-auto transition-opacity duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="text-center font-bold font-[family-name:var(--font-geist-sans)]"></div>
              </div>

              <div className="flex flex-col">
                <div className="text-4xl text-neutral-600 font-semibold text-center py-5"></div>
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
                    <div className="text-center font-semibold text-4xl text-neutral-700 py-5">
                      Select a server to view and manage members
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="drawer-side ml-60">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="menu bg-neutral-950 border-r border-[#252525] min-h-full w-80 p-4"
          >
            <div>
              <div className="space-y-6 mt-3">
                <div className="rounded-md">
                  <label className="block text-lg text-neutral-200 font-medium mb-3">
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
                  <label className="block text-lg text-neutral-200 font-medium mb-3">
                    My Arcs
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
                        className="bg-[#ededed] disabled:bg-neutral-500 text-black font-semibold hover:bg-neutral-400"
                        disabled={
                          isApplyingAll ||
                          !selectedServer ||
                          members.length === 0
                        }
                      >
                        {isApplyingAll ? "Applying..." : "Apply All"}
                      </DSButton>
                      <DSButton
                        onClick={handleSaveArc}
                        className="bg-[#ededed] font-semibold disabled:bg-neutral-500 text-black hover:bg-neutral-400"
                        disabled={
                          isSavingArc ||
                          !selectedServer ||
                          !selectedArc ||
                          members.length === 0
                        }
                      >
                        {isSavingArc ? "Saving..." : "Save Arc"}
                      </DSButton>
                    </div>
                  </ul>
                </div>

                <div className="border-t border-[#252525] pt-4">
                  <label className="inline-block text-neutral-200 text-lg font-medium">
                    Arc Studio
                  </label>
                  <h2 className="inline-block mx-2 font-light text-neutral-500">
                    experimental
                  </h2>
                  <h3 className="font-light mt-1 text-sm text-neutral-400">
                    Generate names for your members based on a theme and apply
                    them within seconds.
                  </h3>

                  <div className="mt-4">
                    <button
                      className="flex items-center gap-1 py-1 text-neutral-200 transition-all text-md cursor-pointer relative"
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
                          className="hover:text-neutral-400 inline-block"
                        >
                          {category}
                        </motion.span>
                      </AnimatePresence>
                    </button>
                    <DSInput
                      className="transition-all bg-black border text-neutral-100 rounded-lg border-[#252525]"
                      placeholder="Enter a movie, game, thing, etc"
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                    />
                    <div className="flex justify-end space-x-4 mt-3">
                      <DSButton
                        onClick={handleGenerateCharacters}
                        className="transition-all bg-[#ededed] disabled:bg-neutral-500 font-semibold text-black hover:bg-neutral-400"
                        disabled={
                          loading || !selectedServer || members.length === 0
                        }
                      >
                        {loading ? (
                          <LoaderPinwheel className="animate-spin w-5 h-5" />
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
