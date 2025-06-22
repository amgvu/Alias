import { Button } from "@/components/ui/button";
import { Server } from "@/types/types";
import { SquareDashedMousePointer } from "lucide-react";

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
    <Button
      onClick={() => setShowCheckboxes(!showCheckboxes)}
      className="p-2 mr-2 bg-button border border-border-active rounded-md cursor-pointer text-sm text-text-primary hover:bg-button-hover"
      disabled={!selectedServer}
    >
      <SquareDashedMousePointer className="w-4.5 h-4.5 inline-block" />
      {showCheckboxes ? "Unselect" : "Select"}
    </Button>
  );
}
