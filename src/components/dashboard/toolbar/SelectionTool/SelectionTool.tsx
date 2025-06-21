import { Server } from "@/types/types";
import { SquareDashed } from "lucide-react";

interface SelectionToolProps {
  selectedServer: Server | null;
  showCheckboxes: boolean;
  setShowCheckboxes: (show: boolean) => void;
}

export function SelectionTool({
  selectedServer,
  showCheckboxes,
  setShowCheckboxes,
}: SelectionToolProps) {
  return (
    <button
      onClick={() => setShowCheckboxes(!showCheckboxes)}
      className="p-2 mx-2 bg-button border border-border ml-64 rounded-md cursor-pointer text-sm text-text-primary hover:bg-button-hover"
      disabled={!selectedServer}
    >
      <SquareDashed className="w-4.5 h-4.5 inline-block mb-0.5 mr-1" />
      {showCheckboxes ? "Unselect" : "Select"}
    </button>
  );
}
