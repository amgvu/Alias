import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, WandSparkles, Shuffle } from "lucide-react";
import { Member, Server, Category } from "@/types/types";
import React from "react";
import { Input } from "@/components/ui/input";

interface AIPanelProps {
  selectedServer: Server | null;
  members: Member[];
  selectedUserIds: string[];
  category: string;
  categories: Category[];
  setCategory: (category: string | ((current: string) => string)) => void;
  theme: string;
  setTheme: (theme: string) => void;
  loading: boolean;
  handleGenerateCharacters: (selectedMembers: Member[]) => void;
}

export default function AIPanel({
  selectedServer,
  members,
  selectedUserIds = [],
  category,
  categories,
  setCategory,
  theme,
  setTheme,
  loading,
  handleGenerateCharacters,
}: AIPanelProps) {
  const currentCategory =
    categories.find((cat) => cat.id === category) || categories[0];

  const handleGenerate = () => {
    if (!selectedUserIds || selectedUserIds.length === 0) return;
    const selectedMembers = members.filter((member) =>
      selectedUserIds.includes(member.user_id)
    );
    handleGenerateCharacters(selectedMembers);
  };

  const randomCategory = () => {
    const randomIndex = Math.floor(Math.random() * categories.length);
    setCategory(categories[randomIndex].id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="bg-panel border-r translate-x-78 -translate-y-[31.2px] h-screen border-border w-64"
    >
      <div>
        <div className="border-b border-border p-4.5">
          <h1 className="font-">AI</h1>
        </div>
        <div className="px-2 py-2">
          <div className="pt-1 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary font-medium">
                  Theme Category
                </span>
                <button
                  onClick={randomCategory}
                  className="text-xs cursor-pointer text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
                >
                  <Shuffle className="w-3 h-3" />
                  Random
                </button>
              </div>

              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = cat.id === category;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`flex cursor-pointer items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-button text-text-primary border border-border-active"
                          : "bg-input border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-button-hover"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="bg-input border border-border-subtle rounded-md p-2 space-y-1"
              >
                <div className="flex items-center gap-2">
                  {React.createElement(currentCategory.icon, {
                    className: "w-4 h-4 text-text-primary",
                  })}
                  <span className="text-sm font-medium text-text-primary">
                    {currentCategory.name}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  {currentCategory.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {currentCategory.examples.map((example, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-button px-1.5 py-0.5 rounded text-text-secondary"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-xs text-text-secondary font-medium">
                Specific Theme
              </label>
              <Input
                className="bg-input border-border"
                maxLength={50}
                placeholder={`Enter ${currentCategory.name.toLowerCase()}...`}
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center space-x-4 mt-4">
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
                    className="flex flex-col items-center"
                  >
                    <span className="text-xs mb-1 text-text-secondary text-center">
                      Select users before generating names
                    </span>
                    <Button
                      onClick={handleGenerate}
                      className={`transition-all cursor-pointer bg-button ${
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
                    </Button>
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
