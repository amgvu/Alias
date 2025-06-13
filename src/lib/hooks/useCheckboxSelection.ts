import { useState, useEffect, useCallback } from "react";
import { Member } from "@/types/types";

interface UseCheckboxSelectionProps {
  members: Member[];
  showCheckboxes: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
}

export const useCheckboxSelection = ({
  members,
  showCheckboxes,
  onSelectionChange,
}: UseCheckboxSelectionProps) => {
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(
    new Set()
  );

  const getAllUserIds = useCallback(() => {
    return members.map((m) => m.user_id);
  }, [members]);

  const groupMembersByRole = useCallback(() => {
    const grouped = members.reduce((acc: Record<string, Member[]>, member) => {
      const highestRole = member.roles[0]?.name || "No Role";
      if (!acc[highestRole]) {
        acc[highestRole] = [];
      }
      acc[highestRole].push(member);
      return acc;
    }, {});
    return grouped;
  }, [members]);

  const areAllMembersSelected = useCallback(() => {
    const allUserIds = getAllUserIds();
    return (
      allUserIds.length > 0 && allUserIds.every((id) => selectedUserIds.has(id))
    );
  }, [getAllUserIds, selectedUserIds]);

  const areAllRoleMembersSelected = useCallback(
    (roleName: string) => {
      const grouped = groupMembersByRole();
      const userIds = grouped[roleName]?.map((m) => m.user_id) || [];
      return (
        userIds.length > 0 && userIds.every((id) => selectedUserIds.has(id))
      );
    },
    [groupMembersByRole, selectedUserIds]
  );

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
  }, [areAllMembersSelected, getAllUserIds]);

  const handleRoleCheckboxChange = useCallback(
    (roleName: string) => {
      const grouped = groupMembersByRole();
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
    },
    [groupMembersByRole, areAllRoleMembersSelected]
  );

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

  const checkboxContainerVariants = {
    hidden: { width: 0, opacity: 0, x: -10, transition: { duration: 0.15 } },
    visible: {
      width: "30px",
      opacity: 1,
      x: 0,
      transition: { duration: 0.15 },
    },
  };

  return {
    selectedUserIds,
    areAllMembersSelected,
    areAllRoleMembersSelected,
    handleCheckboxToggle,
    handleGlobalCheckboxChange,
    handleRoleCheckboxChange,
    checkboxContainerVariants,
  };
};
