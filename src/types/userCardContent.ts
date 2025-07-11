/* eslint-disable @typescript-eslint/no-explicit-any */
import { Member } from "@/types/types";

export interface UserCardContentProps {
  member: Member;
  inputValue: string;
  displayValue: string;
  showOverlay: boolean;
  isExpanded: boolean;
  isDragOverlay: boolean;
  draggableAttributes: any;
  draggableListeners: any;
  setDragRef: (element: HTMLElement | null) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  handleFocus: () => void;
  handleImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  handleExpansionToggle: () => void;
  showResetSuccess: boolean;
  handleRevert: () => void;
  handleApplyNickname: () => void;
}
