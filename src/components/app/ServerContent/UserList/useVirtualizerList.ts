"use client";
import { Member } from "@/types/types";
import { useCallback, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getSortedMembers } from "@/lib/utilities";

interface VirtualItem {
  type: "role-header" | "member";
  id: string;
  roleName?: string;
  member?: Member;
  memberIndex?: number;
  originalIndex?: number;
}

interface UseVirtualizerListProps {
  members: Member[];
}

export const useVirtualizerList = ({ members }: UseVirtualizerListProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const createVirtualItems = useCallback(() => {
    const items: VirtualItem[] = [];
    let memberIndex = 0;

    const { grouped, sortedRoles } = getSortedMembers(members);

    sortedRoles.forEach((roleName) => {
      items.push({
        type: "role-header",
        id: `role-${roleName}`,
        roleName,
      });

      grouped[roleName].forEach((member) => {
        const originalIndex = members.findIndex(
          (m) => m.user_id === member.user_id
        );
        items.push({
          type: "member",
          id: `member-${member.user_id}`,
          member,
          memberIndex: memberIndex++,
          originalIndex,
        });
      });
    });

    return items;
  }, [members]);

  const virtualItems = createVirtualItems();

  const virtualizer = useVirtualizer({
    count: virtualItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(
      (index: number) => {
        const item = virtualItems[index];
        return item?.type === "role-header" ? 30 : 68;
      },
      [virtualItems]
    ),
    overscan: 2,
    getItemKey: useCallback(
      (index: number) => virtualItems[index]?.id || index,
      [virtualItems]
    ),
  });

  const items = virtualizer.getVirtualItems();
  return { items, parentRef, virtualizer, virtualItems };
};
