import { Server } from "@/types/types";
import { SelectionTool } from "./SelectionTool.tsx/SelectionTool";

interface ToolbarProps {
  selectedServer: Server | null;
  showCheckboxes: boolean;
  setShowCheckboxes: (show: boolean) => void;
}

export function Toolbar({
  selectedServer,
  showCheckboxes,
  setShowCheckboxes,
}: ToolbarProps) {
  return (
    <div className="bg-panel z-4 fixed w-screen translate-x-14 p-[11.6px] border-border border-r border-b">
      <SelectionTool
        selectedServer={selectedServer}
        showCheckboxes={showCheckboxes}
        setShowCheckboxes={setShowCheckboxes}
      />
    </div>
  );
}
