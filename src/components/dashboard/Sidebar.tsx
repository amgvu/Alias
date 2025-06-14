import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  ChevronsUpDown,
  WandSparkles,
  CheckCheck,
  SaveAll,
  TextSelect,
  Users,
  NotebookText,
  Settings,
  Binoculars,
  Landmark,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ChevronsLeft,
} from "lucide-react";
import { DSButton, DSMenu, DSCreateMenu } from "@/components";
import { Member, Arc } from "@/types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

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
  handleGenerateCharacters: (selectedMembers: Member[]) => void;
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

  const handleGenerate = () => {
    if (!selectedUserIds || selectedUserIds.length === 0) return;
    const selectedMembers = members.filter((member) =>
      selectedUserIds.includes(member.user_id)
    );
    handleGenerateCharacters(selectedMembers);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="bg-zinc-950 border-r rounded-2xl border-[#252525] h-screen w-80"
    >
      <div>
        <div className="py-4 bg-zinc-900/20 border-b border-[#252525] rounded-tr-2xl">
          <div className="flex items-center justify-between px-4">
            <h1 className="space-x-2 mt-1">
              <Image
                src="/Arclify.svg"
                width="30"
                height="30"
                alt="logo"
                className="inline-block -translate-y-1"
              />
              <span className="text-zinc-200 text-xl font-gintoNord whitespace-nowrap">
                Arclify
              </span>
            </h1>
          </div>
        </div>
        <div className="space-y-6 px-4 py-2">
          <Accordion
            type="multiple"
            defaultValue={["servers", "nicknames"]}
            className="w-full"
          >
            <AccordionItem value="servers">
              <AccordionTrigger className="text-lg text-zinc-400 font-medium hover:text-zinc-100 hover:no-underline">
                <div className="flex items-center gap-4">
                  <Users className="w-4.5 h-4.5" />
                  <span>Servers</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-4">
                <div className="rounded-md">
                  <DSMenu
                    items={servers.map((server) => server.name)}
                    placeholder="Select a server"
                    selectedItem={selectedServerName}
                    setSelectedItem={handleServerSelection}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="nicknames">
              <AccordionTrigger className="text-lg text-zinc-400 font-medium hover:text-zinc-100 hover:no-underline">
                <div className="flex items-center gap-4">
                  <NotebookText className="w-4.5 h-4.5" />
                  <span>Nicknames</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-4 space-y-3">
                <label className="inline-block text-zinc-200 text-lg font-medium">
                  Nickname Sets
                </label>
                <DSCreateMenu
                  selectedServer={selectedServer}
                  selectedArc={selectedArc}
                  setSelectedArc={setSelectedArc}
                  onCreateNewArc={handleCreateNewArc}
                />

                <div>
                  <ul className="space-y-2">
                    <div className="flex gap-2">
                      <AnimatePresence mode="wait">
                        {isApplyingAll ? (
                          <motion.div
                            key="apply-loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-center w-full"
                          >
                            <Loader2 className="animate-spin w-4 h-4 text-zinc-100" />
                            <p className="ml-2 text-sm text-zinc-100">
                              Applying...
                            </p>
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
                              className="w-full bg-zinc-800 disabled:bg-zinc-900 disabled:text-zinc-500 border border-zinc-700 text-zinc-100 font-bold hover:bg-zinc-700"
                              disabled={
                                isApplyingAll ||
                                !selectedServer ||
                                members.length === 0 ||
                                selectedUserIds.length === 0
                              }
                            >
                              <CheckCheck className="w-4 h-4 mr-[-2px]" />
                              {selectedUserIds.length > 0
                                ? `Apply ${selectedUserIds.length}`
                                : "Apply"}
                            </DSButton>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <DSButton
                        onClick={() => setShowCheckboxes(!showCheckboxes)}
                        className="w-full bg-zinc-800 font-bold disabled:bg-zinc-900 disabled:text-zinc-500 border border-zinc-700 text-zinc-100 hover:bg-zinc-700"
                        disabled={!selectedServer}
                      >
                        <TextSelect className="w-4 h-4 mr-[-2px]" />
                        {showCheckboxes ? "Unselect" : "Select"}
                      </DSButton>
                    </div>

                    <AnimatePresence mode="wait">
                      {isSavingArc ? (
                        <motion.div
                          key="save-loader"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-center"
                        >
                          <Loader2 className="animate-spin w-4 h-4 text-zinc-100" />
                          <p className="ml-2 text-sm text-zinc-100">
                            Saving Set...
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="save-btn"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <DSButton
                            onClick={handleSaveArc}
                            className="w-full bg-zinc-800 font-bold disabled:bg-zinc-900 disabled:text-zinc-500 border border-zinc-700 text-zinc-100 hover:bg-zinc-700"
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
                  </ul>
                </div>

                <div className="border-t border-[#252525] pt-2">
                  <label className="inline-block text-zinc-200 text-lg font-medium">
                    Name Generator
                  </label>

                  <div className="pt-1">
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
                            className="flex items-center justify-center"
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
                            className=""
                          >
                            <DSButton
                              onClick={handleGenerate}
                              className={`transition-all bg-[#ededed] ${
                                !loading && "disabled:bg-zinc-900"
                              } bg-zinc-800 disabled:text-zinc-500 border border-zinc-700 text-zinc-100 font-bold hover:bg-zinc-700`}
                              disabled={
                                loading ||
                                !selectedServer ||
                                members.length === 0 ||
                                selectedUserIds.length === 0
                              }
                            >
                              <WandSparkles className="w-4 h-4 mr-[-2px]" />
                              {selectedUserIds.length > 0
                                ? `Generate ${selectedUserIds.length}`
                                : "Generate"}
                            </DSButton>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="p">
              <AccordionTrigger className="text-lg text-zinc-400 font-medium hover:text-zinc-100 hover:no-underline">
                <div className="flex items-center gap-4">
                  <Landmark className="w-4.5 h-4.5" />
                  <span>Roles</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-4"></AccordionContent>
            </AccordionItem>
            <AccordionItem value="g">
              <AccordionTrigger className="text-lg text-zinc-400 font-medium hover:text-zinc-100 hover:no-underline">
                <div className="flex items-center gap-4">
                  <Binoculars className="w-4.5 h-4.5" />
                  <span>Monitoring</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-4"></AccordionContent>
            </AccordionItem>
            <AccordionItem value="s">
              <AccordionTrigger className="text-lg text-zinc-400 font-medium hover:text-zinc-100 hover:no-underline">
                <div className="flex items-center gap-4">
                  <Settings className="w-4.5 h-4.5" />
                  <span>Utilities</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-4"></AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </motion.div>
  );
}
