import React, { useCallback, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import MemberItem from "./MemberItem";
import RoleHeader from "./RoleHeader";
import UserListCard from "../UserListCard/UserListCard";
import { Member, Server } from "@/types/types";
import { getSortedMembers } from "@/lib/utilities";

interface VirtualItem {
  type: "role-header" | "member";
  id: string;
  roleName?: string;
  member?: Member;
  memberIndex?: number;
  originalIndex?: number;
}

interface VirtualizerListProps {
  members: Member[];
  isUpdating: Set<string>;
  selectedServer: Server | null;
  showCheckboxes: boolean;
  selectedUserIds: Set<string>;
  onUpdateNicknameLocally: (index: number, nickname: string) => void;
  onApplyNickname: (
    userId: string,
    nickname: string,
    globalName: string
  ) => void;
  onCheckboxToggle: (userId: string) => void;
  onRoleCheckboxChange: (roleName: string) => void;
  areAllRoleMembersSelected: (roleName: string) => boolean;
  onNicknameSwap?: (
    fromUserId: string,
    toUserId: string,
    fromNickname: string,
    toNickname: string
  ) => void;
}

export default function VirtualizerList({
  members,
  isUpdating,
  selectedServer,
  showCheckboxes,
  selectedUserIds,
  onUpdateNicknameLocally,
  onApplyNickname,
  onCheckboxToggle,
  onRoleCheckboxChange,
  areAllRoleMembersSelected,
  onNicknameSwap,
}: VirtualizerListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedData, setDraggedData] = useState<{
    userId: string;
    nickname: string;
    username: string;
  } | null>(null);

  const [swappedUsers, setSwappedUsers] = useState<Set<string>>(new Set());
  const [swapAnimationKey, setSwapAnimationKey] = useState(0);

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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    if (event.active.data.current?.type === "nickname") {
      setDraggedData({
        userId: event.active.data.current.userId,
        nickname: event.active.data.current.nickname,
        username: event.active.data.current.username,
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !active.data.current || !over.data.current) {
      setActiveId(null);
      setDraggedData(null);
      return;
    }

    if (
      active.data.current.type === "nickname" &&
      over.data.current.type === "usercard" &&
      active.data.current.userId !== over.data.current.userId
    ) {
      const fromUserId = active.data.current.userId;
      const toUserId = over.data.current.userId;
      const fromNickname = active.data.current.nickname;
      const toNickname = over.data.current.currentNickname;

      setSwappedUsers(new Set([fromUserId, toUserId]));
      setSwapAnimationKey((prev) => prev + 1);

      if (onNicknameSwap) {
        onNicknameSwap(fromUserId, toUserId, fromNickname, toNickname);
      }

      setTimeout(() => {
        setSwappedUsers(new Set());
      }, 600);
    }

    setActiveId(null);
    setDraggedData(null);
  };

  const activeMember = draggedData
    ? members.find((m) => m.user_id === draggedData.userId)
    : null;

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div ref={parentRef} className="h-screen overflow-auto">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {items.map((virtualItem) => {
            const item = virtualItems[virtualItem.index];
            if (!item) return null;

            return (
              <div
                key={virtualItem.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {item.type === "role-header" && item.roleName ? (
                  <RoleHeader
                    roleName={item.roleName}
                    showCheckboxes={showCheckboxes}
                    isAllSelected={areAllRoleMembersSelected(item.roleName)}
                    onCheckboxChange={() =>
                      onRoleCheckboxChange(item.roleName!)
                    }
                  />
                ) : item.type === "member" && item.member ? (
                  <MemberItem
                    member={item.member}
                    memberIndex={item.memberIndex!}
                    originalIndex={item.originalIndex!}
                    isSelected={selectedUserIds.has(item.member.user_id)}
                    showCheckboxes={showCheckboxes}
                    isUpdating={isUpdating}
                    selectedServer={selectedServer}
                    onCheckboxToggle={onCheckboxToggle}
                    onUpdateNicknameLocally={onUpdateNicknameLocally}
                    onApplyNickname={onApplyNickname}
                    onNicknameSwap={onNicknameSwap}
                    isSwapped={swappedUsers.has(item.member.user_id)}
                    swapAnimationKey={swapAnimationKey}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <DragOverlay>
        {activeId && activeMember && draggedData ? (
          <UserListCard
            member={activeMember}
            selectedServer={selectedServer}
            isUpdating={new Set()}
            isDragOverlay={true}
            draggedNickname={draggedData.nickname}
            onUpdateNicknameLocally={() => {}}
            onApplyNickname={() => {}}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
