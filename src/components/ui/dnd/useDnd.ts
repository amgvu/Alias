import { useAnimation } from "framer-motion";
import { Member } from "@/types/types";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface UseDndProps {
  member: Member;
  inputValue: string;
  isExpanded: boolean;
  isUpdating: Set<string>;
  isDragOverlay?: boolean;
  draggedNickname?: string;
}

export const useDnd = ({
  member,
  inputValue,
  isExpanded,
  isUpdating,
  isDragOverlay,
  draggedNickname,
}: UseDndProps) => {
  const controls = useAnimation();

  const showOverlay = isUpdating.has(member.user_id);

  const {
    attributes: draggableAttributes,
    listeners: draggableListeners,
    setNodeRef: setDragRef,
    transform: dragTransform,
    isDragging,
  } = useDraggable({
    id: `nickname-${member.user_id}`,
    data: {
      type: "nickname",
      userId: member.user_id,
      nickname: inputValue || "",
      username: member.username,
    },
    disabled: !inputValue || showOverlay || isExpanded,
  });

  const {
    setNodeRef: setDropRef,
    isOver,
    active,
  } = useDroppable({
    id: `card-${member.user_id}`,
    data: {
      type: "usercard",
      userId: member.user_id,
      currentNickname: inputValue || "",
    },
  });

  const isDropTarget =
    isOver &&
    active?.data.current?.type === "nickname" &&
    active?.data.current?.userId !== member.user_id;
  const isDragSource = isDragging && !isDragOverlay;

  const dragStyle = isDragOverlay
    ? {}
    : {
        transform: CSS.Translate.toString(dragTransform),
        opacity: isDragSource ? 0.3 : 1,
        zIndex: isDragging ? 1000 : "auto",
      };

  const displayValue = isDragOverlay
    ? draggedNickname || inputValue
    : inputValue;

  return {
    controls,
    draggableAttributes,
    draggableListeners,
    isDropTarget,
    displayValue,
    dragStyle,
    isDragSource,
    showOverlay,

    setDropRef,
    setDragRef,
  };
};
