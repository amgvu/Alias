import { Server } from "@/types/types";
import { SelectionTool } from "./SelectionTool/SelectionTool";
import { ApplyTool } from "./ApplyTool/ApplyTool";
import { Member } from "@/types/types";

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
      <div className="bg-panel z-4 fixed w-screen translate-x-[111.0px] translate-y-8 p-[9.0px] border-border border-r border-t border-b">
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
