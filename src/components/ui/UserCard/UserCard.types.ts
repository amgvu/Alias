/* eslint-disable @typescript-eslint/no-explicit-any */
import { Member, Server, Nickname } from "@/types/types";

export interface UserCardProps {
  member: Member;
  isUpdating: Set<string>;
  selectedServer: Server | null;
  onUpdateNicknameLocally: (nickname: string) => void;
  onApplyNickname: () => void;
  isDragOverlay?: boolean;
}

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

export interface NicknamesListProps {
  member: Member;
  isUpdating: Set<string>;
  selectedServer: Server | null;
  onUpdateNicknameLocally: (nickname: string) => void;
  onApplyNickname: () => void;
  handleExpansionToggle: () => void;
  previousNicknames: Nickname[];
  isLoadingNicknames: boolean;
  fetchError: string | null;
  deletingNicknames: string[];
  handleNicknameSelectAndClose: (nickname: string) => void;
  handleNicknameDeleteWithDelay: (nickname: Nickname) => void;
}

export interface LoadingOverlayProps {
  showOverlay: boolean;
}

export interface ActionButtonsProps {
  showOverlay: boolean;
  inputValue: string;
  showResetSuccess: boolean;
  handleRevert: () => void;
  handleApplyNickname: () => void;
}
