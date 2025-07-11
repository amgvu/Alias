import { Server } from "@/types/types";

export interface SelectionToolProps {
  selectedServer: Server | null;
  showCheckboxes: boolean;
  setShowCheckboxes: (show: boolean) => void;
}
