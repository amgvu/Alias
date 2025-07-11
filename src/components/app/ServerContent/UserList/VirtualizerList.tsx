"use client";
import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import MemberItem from "@/components/app/ServerContent/UserList/MemberItem";
import RoleHeader from "@/components/app/ServerContent/UserList/RoleHeader";
import UserCard from "@/components/ui/UserCard/UserCard";
import { useVirtualizerList } from "./useVirtualizerList";

import { VirtualizerListProps } from "@/components/app/ServerContent/UserList/VirtualizerList.types";

export default function VirtualizerList({
  members,
  isUpdating,
  selectedServer,
  showCheckboxes,
  selectedUserIdSets,
  onUpdateNicknameLocally,
  onApplyNickname,
  onCheckboxToggle,
  onRoleCheckboxChange,
  areAllRoleMembersSelected,
  onNicknameSwap,
}: VirtualizerListProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedData, setDraggedData] = useState<{
    userId: string;
    nickname: string;
    username: string;
  } | null>(null);
  const [swappedUsers, setSwappedUsers] = useState<Set<string>>(new Set());
  const [swapAnimationKey, setSwapAnimationKey] = useState(0);

  const { items, parentRef, virtualizer, virtualItems } = useVirtualizerList({
    members,
  });

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
                    isSelected={selectedUserIdSets.has(item.member.user_id)}
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
          <div style={{ width: "1000px" }}>
            <UserCard
              member={activeMember}
              selectedServer={selectedServer}
              isUpdating={new Set()}
              isDragOverlay={true}
              onUpdateNicknameLocally={() => {}}
              onApplyNickname={() => {}}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
