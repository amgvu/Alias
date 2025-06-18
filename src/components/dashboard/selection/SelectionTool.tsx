import DSButton from "@/components/ui/Button/Button";
import { Server } from "@/types/types";
import { TextSelect } from "lucide-react";

interface SelectionButtonProps {
  selectedServer: Server | null;
  showCheckboxes: boolean;
  setShowCheckboxes: (show: boolean) => void;
}

export function SelectionButton({
  selectedServer,
  showCheckboxes,
  setShowCheckboxes,
}: SelectionButtonProps) {
  return (
    <DSButton
      onClick={() => setShowCheckboxes(!showCheckboxes)}
      className="w-full bg-button font-bold disabled:bg-disabled-button disabled:text-text-disabled border border-border-subtle text-text-primary hover:bg-button-hover"
      disabled={!selectedServer}
    >
      <TextSelect className="w-4 h-4 mr-[-2px]" />
      {showCheckboxes ? "Unselect" : "Select"}
    </DSButton>
  );
}
