import { motion } from "framer-motion";

import { Member, Arc } from "@/types/types";
import { Accordion } from "@/components/ui/accordion";

import { ServerPanel } from "./ServerPanel";
import { NicknamesPanel } from "./NicknamesPanel";

interface SidebarProps {
  servers: { id: string; name: string; iconURL: string }[];
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="bg-zinc-950 border-r translate-x-56 border-[#252525] h-screen w-80"
    >
      <div>
        <div className="space-y-6 px-4 py-2">
          <Accordion
            type="multiple"
            defaultValue={["servers", "nicknames"]}
            className="w-full"
          >
            <ServerPanel
              servers={servers}
              selectedServerName={selectedServerName}
              handleServerSelection={handleServerSelection}
            />

            <NicknamesPanel
              selectedServer={selectedServer}
              selectedArc={selectedArc}
              setSelectedArc={setSelectedArc}
              handleCreateNewArc={handleCreateNewArc}
              isApplyingAll={isApplyingAll}
              isSavingArc={isSavingArc}
              handleSaveArc={handleSaveArc}
              members={members}
              onApplyToSelection={onApplyToSelection}
              selectedUserIds={selectedUserIds}
              showCheckboxes={showCheckboxes}
              setShowCheckboxes={setShowCheckboxes}
              category={category}
              setCategory={setCategory}
              theme={theme}
              setTheme={setTheme}
              loading={loading}
              handleGenerateCharacters={handleGenerateCharacters}
              categories={categories}
            />
          </Accordion>
        </div>
      </div>
    </motion.div>
  );
}
