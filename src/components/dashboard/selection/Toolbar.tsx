import { Server } from "@/types/types";
import { TextSelect } from "lucide-react";

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
    <div className="bg-panel w-screen translate-x-14 py-[13.3px] border-border border-r border-b">
      <button
        onClick={() => setShowCheckboxes(!showCheckboxes)}
        className="bg-button ml-2 p-2 rounded-md cursor-pointer text-xs text-text-primary hover:bg-button-hover"
        disabled={!selectedServer}
      >
        <TextSelect className="w-4 inline-block h-4 mr-1" />
        {showCheckboxes ? "Unselect" : "Select"}
      </button>
    </div>
  );
}
