import React, { useCallback, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import MemberItem from "./MemberItem";
import RoleHeader from "./RoleHeader";
import { Member } from "@/types/types";

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
  selectedServer: string;
  isApplyingAll: boolean;
  animationKey: number;
  showCheckboxes: boolean;
  selectedUserIds: Set<string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkboxContainerVariants: any;
  onNicknameChange: (index: number, nickname: string) => void;
  onApplyNickname: (userId: string, nickname: string) => void;
  onCheckboxToggle: (userId: string) => void;
  onRoleCheckboxChange: (roleName: string) => void;
  areAllRoleMembersSelected: (roleName: string) => boolean;
}

export default function VirtualizerList({
  members,
  isUpdating,
  selectedServer,
  isApplyingAll,
  animationKey,
  showCheckboxes,
  selectedUserIds,
  checkboxContainerVariants,
  onNicknameChange,
  onApplyNickname,
  onCheckboxToggle,
  onRoleCheckboxChange,
  areAllRoleMembersSelected,
}: VirtualizerListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const groupedMembers = useCallback(() => {
    const grouped = members.reduce((acc: Record<string, Member[]>, member) => {
      const highestRole = member.roles[0]?.name || "No Role";
      if (!acc[highestRole]) {
        acc[highestRole] = [];
      }
      acc[highestRole].push(member);
      return acc;
    }, {});

    const sortedRoles = Object.keys(grouped).sort((a, b) => {
      const roleAPosition =
        members.find((m) => m.roles[0]?.name === a)?.roles[0]?.position ?? -1;
      const roleBPosition =
        members.find((m) => m.roles[0]?.name === b)?.roles[0]?.position ?? -1;
      return roleBPosition - roleAPosition;
    });

    return { grouped, sortedRoles };
  }, [members]);

  const createVirtualItems = useCallback(() => {
    const items: VirtualItem[] = [];
    let memberIndex = 0;
    const { grouped, sortedRoles } = groupedMembers();

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
  }, [members, groupedMembers]);

  const virtualItems = createVirtualItems();

  const virtualizer = useVirtualizer({
    count: virtualItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(
      (index: number) => {
        const item = virtualItems[index];
        return item?.type === "role-header" ? 40 : 75;
      },
      [virtualItems]
    ),
    overscan: 5,
    getItemKey: useCallback(
      (index: number) => virtualItems[index]?.id || index,
      [virtualItems]
    ),
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div ref={parentRef} className="h-[1630px] overflow-auto">
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
                  onCheckboxChange={() => onRoleCheckboxChange(item.roleName!)}
                  checkboxContainerVariants={checkboxContainerVariants}
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
                  isApplyingAll={isApplyingAll}
                  animationKey={animationKey}
                  onCheckboxToggle={onCheckboxToggle}
                  onNicknameChange={onNicknameChange}
                  onApplyNickname={onApplyNickname}
                  checkboxContainerVariants={checkboxContainerVariants}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
