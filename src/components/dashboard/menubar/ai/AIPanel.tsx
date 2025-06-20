import DSButton from "@/components/ui/Button/Button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronsUpDown, Loader2, WandSparkles } from "lucide-react";
import { Member, Server } from "@/types/types";

interface AIPanelProps {
  selectedServer: Server | null;
  members: Member[];
  selectedUserIds: string[];
  category: string;
  setCategory: (category: string | ((current: string) => string)) => void;
  theme: string;
  setTheme: (theme: string) => void;
  loading: boolean;
  handleGenerateCharacters: (selectedMembers: Member[]) => void;
  categories: string[];
}

export default function AIPanel({
  selectedServer,
  members,
  selectedUserIds = [],
  category,
  setCategory,
  theme,
  setTheme,
  loading,
  handleGenerateCharacters,
  categories,
}: AIPanelProps) {
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
      className="bg-panel border-r translate-x-78 -translate-y-5 h-screen border-border w-64"
    >
      <div>
        <div className="border-b border-border p-4">
          <h1 className="font-">AI</h1>
        </div>
        <div className="border-t px-4 border-border">
          <div className="pt-1">
            <button
              className="flex items-center gap-1 py-1 text-text-primary transition-all text-sm cursor-pointer relative"
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
              className="bg-input py-1 border text-md text-text-primary rounded-md border-border-subtle cursor-pointer pl-2 focus:cursor-auto max-w-full shadow-white/10 focus:outline-hidden focus:ring-1 focus:ring-border-active transition duration-200 ease-in-out w-full"
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
                    <Loader2 className="animate-spin w-8 h-8 text-text-primary" />
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
                      className={`transition-all bg-button ${
                        !loading && "disabled:bg-disabled-button"
                      } bg-button disabled:text-text-disabled border border-border-subtle text-text-primary font-bold hover:bg-button-hover`}
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
      </div>
    </motion.div>
  );
}
