/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useVirtualizer } from "@tanstack/react-virtual";
import MemberItem from "./MemberItem";
import RoleHeader from "./RoleHeader";
import { styles } from "./UserList.styles";
import { Checkbox } from "@/components/ui/checkbox";
import { Member } from "@/types/types";

interface UserListProps {
  members: Member[];
  isUpdating: string | null;
  selectedServer: string;
  onNicknameChange: (index: number, nickname: string) => void;
  onApplyNickname: (userId: string, nickname: string) => void;
  isApplyingAll: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  showCheckboxes: boolean;
  setShowCheckboxes: (show: boolean) => void;
}

interface VirtualItem {
  type: "role-header" | "member";
  id: string;
  roleName?: string;
  member?: Member;
  memberIndex?: number;
  originalIndex?: number;
}

export function DSUserList({
  members,
  isUpdating,
  selectedServer,
  onNicknameChange,
  onApplyNickname,
  isApplyingAll,
  onSelectionChange,
  showCheckboxes,
}: UserListProps) {
  const [animationKey, setAnimationKey] = useState(0);
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(
    new Set()
  );
  const parentRef = useRef<HTMLDivElement>(null);

  const groupedMembers = () => {
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
  };

  const checkboxContainerVariants = {
    hidden: { width: 0, opacity: 0, x: -10, transition: { duration: 0.15 } },
    visible: {
      width: "32px",
      opacity: 1,
      x: 0,
      transition: { duration: 0.15 },
    },
  };

  const createVirtualItems = () => {
    const items: VirtualItem[] = [];
    let memberIndex = 0;
    const { grouped, sortedRoles } = groupedMembers();

    sortedRoles.forEach((roleName) => {
      items.push({
        type: "role-header",
        id: `role-${roleName}`,
        roleName,
      });

      grouped[roleName].forEach((member, indexInRole) => {
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
  };

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

  const getAllUserIds = () => members.map((m) => m.user_id);

  const areAllMembersSelected = () => {
    const allUserIds = getAllUserIds();
    return (
      allUserIds.length > 0 && allUserIds.every((id) => selectedUserIds.has(id))
    );
  };

  const handleCheckboxToggle = useCallback((userId: string) => {
    setSelectedUserIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  }, []);

  const handleGlobalCheckboxChange = useCallback(() => {
    const allSelected = areAllMembersSelected();
    const allUserIds = getAllUserIds();

    if (allSelected) {
      setSelectedUserIds(new Set());
    } else {
      setSelectedUserIds(new Set(allUserIds));
    }
  }, [members, selectedUserIds]);

  const areAllRoleMembersSelected = (roleName: string) => {
    const { grouped } = groupedMembers();
    const userIds = grouped[roleName]?.map((m) => m.user_id) || [];
    return userIds.length > 0 && userIds.every((id) => selectedUserIds.has(id));
  };

  const handleRoleCheckboxChange = (roleName: string) => {
    const { grouped } = groupedMembers();
    const userIds = grouped[roleName]?.map((m) => m.user_id) || [];
    const allSelected = areAllRoleMembersSelected(roleName);

    setSelectedUserIds((prev) => {
      const newSet = new Set(prev);
      if (allSelected) {
        userIds.forEach((id) => newSet.delete(id));
      } else {
        userIds.forEach((id) => newSet.add(id));
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (!showCheckboxes) {
      setSelectedUserIds(new Set());
    }
  }, [showCheckboxes]);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(Array.from(selectedUserIds));
    }
  }, [selectedUserIds, onSelectionChange]);

  useEffect(() => {
    if (isApplyingAll) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [isApplyingAll]);

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.container}>
        <div className="flex items-center">
          {showCheckboxes && (
            <motion.div
              variants={checkboxContainerVariants}
              initial="hidden"
              animate={showCheckboxes ? "visible" : "hidden"}
              className="overflow-hidden flex-shrink-0"
            >
              <Checkbox
                className="border-zinc-300 border-2 cursor-pointer"
                checked={areAllMembersSelected()}
                onCheckedChange={handleGlobalCheckboxChange}
              />
            </motion.div>
          )}
          {showCheckboxes && <span className="mb-1 ml-1">Select All</span>}
        </div>
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
                      onCheckboxChange={() =>
                        handleRoleCheckboxChange(item.roleName!)
                      }
                      checkboxContainerVariants={checkboxContainerVariants}
                    />
                  ) : item.type === "member" && item.member ? (
                    <MemberItem
                      member={item.member}
                      memberIndex={item.memberIndex!}
                      originalIndex={item.originalIndex!}
                      isSelected={selectedUserIds.has(item.member.user_id)}
                      showCheckboxes={showCheckboxes}
                      isUpdating={isUpdating === item.member.user_id}
                      selectedServer={selectedServer}
                      isApplyingAll={isApplyingAll}
                      animationKey={animationKey}
                      onCheckboxToggle={handleCheckboxToggle}
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
      </div>
    </div>
  );
}

export default DSUserList;
