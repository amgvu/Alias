import { motion, AnimatePresence } from "framer-motion";
import {
  LoaderPinwheel,
  ChevronsUpDown,
  WandSparkles,
  CheckCheck,
  SaveAll,
} from "lucide-react";
import { DSButton, DSMenu, DSCreateMenu } from "@/components";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
}

export default function Sidebar({
  servers,
  selectedServer,
  selectedServerName,
  handleServerSelection,
  selectedArc,
  setSelectedArc,
  handleCreateNewArc,
  applyAllNicknames,
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
}: SidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="menu bg-zinc-950 border-r border-[#252525] min-h-full h-23 w-80 p-4"
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
                <Tooltip>
                  <TooltipTrigger>
                    <TooltipContent>
                      <p>Applies all nicknames to server</p>
                    </TooltipContent>
                    <DSButton
                      onClick={applyAllNicknames}
                      className="bg-zinc-800 disabled:bg-zinc-900 disabled:text-zinc-500 border border-zinc-700 text-zinc-100 font-bold hover:bg-zinc-700"
                      disabled={
                        isApplyingAll || !selectedServer || members.length === 0
                      }
                    >
                      <CheckCheck className="w-4 h-4 mr-[-2px]" />
                      {isApplyingAll ? "Applying..." : "Apply All"}
                    </DSButton>
                  </TooltipTrigger>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <TooltipContent>
                      <p>Saves all current nicknames as a set</p>
                    </TooltipContent>
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
                      {isSavingArc ? "Saving..." : "Save Set"}
                    </DSButton>
                  </TooltipTrigger>
                </Tooltip>
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
                <Tooltip>
                  <TooltipTrigger>
                    <TooltipContent>
                      <p>Creates new nicknames but DOES NOT apply them</p>
                    </TooltipContent>
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
                      {loading ? (
                        <LoaderPinwheel className="animate-spin w-5 h-5 text-zinc-100" />
                      ) : (
                        "Generate"
                      )}
                    </DSButton>
                  </TooltipTrigger>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
