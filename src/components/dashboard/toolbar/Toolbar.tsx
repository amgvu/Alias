import { Server } from "@/types/types";
import { SelectionTool } from "./SelectionTool/SelectionTool";
import { ApplyTool } from "./ApplyTool/ApplyTool";
import { Member } from "@/types/types";

const Spacer = () => {
  return (
    <div className="bg-context-bar h-17 border-t border-border -translate-y-[11.2px] w-64 fixed -translate-x-[259px]"></div>
  );
};

interface ToolbarProps {
  members: Member[];
  onApplyToSelection: (selectedMembers: Member[]) => void;
  selectedUserIds: string[];
  selectedServer: Server | null;
  showCheckboxes: boolean;
  setShowCheckboxes: (show: boolean) => void;
}

export function Toolbar({
  members,
  onApplyToSelection,
  selectedUserIds,
  selectedServer,
  showCheckboxes,
  setShowCheckboxes,
}: ToolbarProps) {
  return (
    <div>
      <div className="bg-context-bar z-4 fixed w-screen translate-x-[39px] p-[10.5px] border-border border-r border-t border-b">
        <Spacer />
        <SelectionTool
          selectedServer={selectedServer}
          showCheckboxes={showCheckboxes}
          setShowCheckboxes={setShowCheckboxes}
        />

        <ApplyTool
          members={members}
          onApplyToSelection={onApplyToSelection}
          selectedUserIds={selectedUserIds}
          selectedServer={selectedServer}
        />
      </div>
    </div>
  );
}
