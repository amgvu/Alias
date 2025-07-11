import { Member } from "@/types/types";

export interface UseDndProps {
  member: Member;
  inputValue: string;
  isExpanded: boolean;
  isUpdating: Set<string>;
  isDragOverlay?: boolean;
  draggedNickname?: string;
}

export interface DropTargetOverlayProps {
  isDropTarget: boolean;
}

export interface DragOverlayProps {
  displayValue: string;
}
