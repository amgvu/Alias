import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, WandSparkles, Shuffle } from "lucide-react";
import { Member, Server, Category } from "@/types/types";
import React from "react";
import { Input } from "@/components/ui/input";
import { styles } from "./AIPanel.styles";

interface AIPanelProps {
  selectedServer: Server | null;
  members: Member[];
  selectedUserIds: string[];
  category: string;
  categoryItems: Category[];
  setCategory: (category: string | ((current: string) => string)) => void;
  theme: string;
  setTheme: (theme: string) => void;
  loading: boolean;
  handleGenerate: () => void;
  randomCategory: () => void;
}

export default function AIPanel({
  selectedServer,
  members,
  selectedUserIds = [],
  category,
  categoryItems,
  setCategory,
  theme,
  setTheme,
  loading,
  handleGenerate,
  randomCategory,
}: AIPanelProps) {
  const currentCategory =
    categoryItems.find((cat) => cat.id === category) || categoryItems[0];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className={styles.panelContainer}
    >
      <div>
        <div className={styles.header}>
          <h1 className={styles.heading}>Themes</h1>
        </div>
        <div className={styles.sectionWrapper}>
          <div className={styles.sectionSpacing}>
            <div className={styles.sectionSpacing}>
              <div className="flex items-center justify-between">
                <span className={styles.sectionLabel}>Theme Category</span>
                <button
                  onClick={randomCategory}
                  className={styles.randomButton}
                >
                  <Shuffle className={styles.iconSmall} />
                  Random
                </button>
              </div>

              <div className="flex flex-wrap mb-2.5 gap-1">
                {categoryItems.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = cat.id === category;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`${styles.categoryButtonBase} ${
                        isSelected
                          ? `${cat.color} text-zinc-900 ${cat.enabledBorderColor} border`
                          : `${cat.disabledColor} border ${cat.disabledBorderColor} text-zinc-900 hover:text-zinc-700 ${cat.disabledHoverColor}`
                      }`}
                    >
                      <Icon className={styles.iconSmall} />
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
                className={`border ${currentCategory.color} ${currentCategory.enabledBorderColor} rounded-md p-2 space-y-1`}
              >
                <div className="flex items-center gap-2">
                  {React.createElement(currentCategory.icon, {
                    className: "w-4 h-4 text-zinc-900",
                  })}
                  <span className="text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] font-medium text-zinc-900">
                    {currentCategory.name}
                  </span>
                </div>
                <p className={styles.categoryDescription}>
                  {currentCategory.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {currentCategory.examples.map((example, idx) => (
                    <span
                      key={idx}
                      className={`${styles.exampleTag} ${currentCategory.disabledColor}`}
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div>
              <label className={styles.inputLabel}>Specific Theme</label>
              <Input
                className={styles.input}
                maxLength={50}
                placeholder={`Enter ${currentCategory.name.toLowerCase()}...`}
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={styles.loaderWrapper}
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
                    <span className={styles.generateInfo}>
                      Select users before generating names
                    </span>
                    <Button
                      onClick={handleGenerate}
                      className={`${styles.generateButton} ${currentCategory.color} ${currentCategory.enabledHoverColor}`}
                      disabled={
                        loading ||
                        !selectedServer ||
                        members.length === 0 ||
                        selectedUserIds.length === 0
                      }
                    >
                      <WandSparkles className={styles.iconMedium} />
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
