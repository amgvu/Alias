import { motion } from "framer-motion";
import {
  Settings,
  Binoculars,
  Landmark,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ChevronsLeft,
} from "lucide-react";
import { Member, Arc } from "@/types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { ServerPanel } from "./ServerPanel";
import { NicknamesPanel } from "./NicknamesPanel";
import { SessionPanel } from "./SessionPanel";

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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="bg-zinc-950 border-r translate-x-56 border-[#252525] h-screen w-80"
    >
      <div>
        <div className="py-4 bg-zinc-900/20 border-b border-[#252525] ">
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
        <SessionPanel />
      </div>
    </motion.div>
  );
}
