import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  ChevronsUpDown,
  WandSparkles,
  CheckCheck,
  SaveAll,
  TextSelect,
} from "lucide-react";
import { DSButton, DSMenu, DSCreateMenu } from "@/components";
import { Member, Arc } from "@/types/types";

interface SidebarProps {
  servers: { id: string; name: string }[];
  selectedServer: string;
  selectedServerName: string;
  handleServerSelection: (serverName: string) => void;
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
  handleGenerateCharacters: () => void;
  categories: string[];
  onApplyToSelection: (selectedMembers: Member[]) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  selectedUserIds?: string[];
  showCheckboxes: boolean;
  setShowCheckboxes: (show: boolean) => void;
}

export default function Sidebar({
  servers,
  selectedServer,
  selectedServerName,
  handleServerSelection,
  selectedArc,
  setSelectedArc,
  handleCreateNewArc,
  //applyAllNicknames,
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
}: SidebarProps) {
  const handleApply = () => {
    if (!selectedUserIds || selectedUserIds.length === 0) return;
    const selectedMembers = members.filter((member) =>
      selectedUserIds.includes(member.user_id)
    );
    onApplyToSelection(selectedMembers);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="menu bg-zinc-950 border-r border-[#252525] min-h-full h-23 w-90 p-4"
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
              <div className="flex justify-center space-x-4">
                <AnimatePresence mode="wait">
                  {isApplyingAll ? (
                    <motion.div
                      key="apply-loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex w-full"
                    >
                      <Loader2 className="animate-spin w-6 h-6 text-zinc-100" />
                      <p className="ml-2">Applying Nicknames...</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="apply-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <DSButton
                        onClick={handleApply}
                        className="bg-zinc-800 px-7 disabled:bg-zinc-900 disabled:text-zinc-500 border border-zinc-700 text-zinc-100 font-bold hover:bg-zinc-700"
                        disabled={
                          isApplyingAll ||
                          !selectedServer ||
                          members.length === 0 ||
                          selectedUserIds.length === 0
                        }
                      >
                        <CheckCheck className="w-4 h-4 mr-[-2px]" />
                        {selectedUserIds.length > 0
                          ? `Apply ${selectedUserIds.length} Nicknames`
                          : "Apply"}
                      </DSButton>
                    </motion.div>
                  )}
                </AnimatePresence>

                <DSButton
                  onClick={() => setShowCheckboxes(!showCheckboxes)}
                  className="bg-zinc-800 font-bold disabled:bg-zinc-900 disabled:text-zinc-500 border border-zinc-700 text-zinc-100 hover:bg-zinc-700"
                >
                  <TextSelect className="w-4 h-4 mr-[-2px]" />
                  {showCheckboxes ? "Unselect" : "Select"}
                </DSButton>

                <AnimatePresence mode="wait">
                  {isSavingArc ? (
                    <motion.div
                      key="save-loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center w-full"
                    >
                      <Loader2 className="animate-spin w-6 h-6 text-zinc-100" />
                      <p className="ml-2">Saving Set...</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="save-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <DSButton
                        onClick={handleSaveArc}
                        className="bg-zinc-800 font-bold disabled:bg-zinc-900 disabled:text-zinc-500 border border-zinc-700 text-zinc-100 hover:bg-zinc-700"
                        disabled={
                          isSavingArc ||
                          !selectedServer ||
                          !selectedArc ||
                          members.length === 0
                        }
                      >
                        <SaveAll className="w-4 h-4 mr-[-2px]" />
                        Save Set
                      </DSButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ul>
          </div>

          <div className="border-t border-[#252525] pt-4">
            <label className="inline-block text-zinc-200 text-lg font-medium">
              Name Generator
            </label>
            <h3 className="font-light mt-1 text-sm text-zinc-400">
              Generate names for your members based on a theme and apply them
              within seconds.
            </h3>

            <div className="mt-4">
              <button
                className="flex items-center gap-1 py-1 text-zinc-200 transition-all text-md cursor-pointer relative"
                onClick={() =>
                  setCategory((current) => {
                    const currentIndex = categories.indexOf(current);
                    const nextIndex = (currentIndex + 1) % categories.length;
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
                    className="hover:text-zinc-400 font-medium inline-block"
                  >
                    {category}
                  </motion.span>
                </AnimatePresence>
              </button>
              <input
                className="bg-black py-1.5 border text-md text-zinc-100 rounded-md border-[#252525] cursor-pointer pl-2 focus:cursor-auto max-w-full shadow-white/10 focus:outline-hidden focus:ring-1 focus:ring-neutral-100 transition duration-200 ease-in-out w-full"
                placeholder="Enter a movie, game, thing, etc"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
              <div className="flex justify-end space-x-4 mt-3">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center w-full"
                    >
                      <Loader2 className="animate-spin w-8 h-8 text-zinc-100" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <DSButton
                        onClick={handleGenerateCharacters}
                        className={`transition-all bg-[#ededed] ${
                          !loading && "disabled:bg-zinc-900"
                        } bg-zinc-800 disabled:text-zinc-500 border border-zinc-700 text-zinc-100 font-bold hover:bg-zinc-700`}
                        disabled={
                          loading || !selectedServer || members.length === 0
                        }
                      >
                        <WandSparkles className="w-4 h-4 mr-[-2px]" />
                        Generate
                      </DSButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
