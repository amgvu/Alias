import { useState, useEffect, useCallback } from "react";
import { Member } from "@/types/types";
import { getSortedMembers } from "@/lib/utilities";
import { checkboxContainerVariants } from "@/lib/data";

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

  const areAllMembersSelected = useCallback(() => {
    const { grouped, sortedRoles } = getSortedMembers(members);
    const allMembersFlat = sortedRoles.flatMap((roleName) => grouped[roleName]);
    const allUserIds = allMembersFlat.map((member) => member.user_id);
    return (
      allUserIds.length > 0 && allUserIds.every((id) => selectedUserIds.has(id))
    );
  }, [members, selectedUserIds]);

  const areAllRoleMembersSelected = useCallback(
    (roleName: string) => {
      const { grouped } = getSortedMembers(members);
      const userIds = grouped[roleName]?.map((m) => m.user_id) || [];
      return (
        userIds.length > 0 && userIds.every((id) => selectedUserIds.has(id))
      );
    },
    [selectedUserIds, members]
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
    const { grouped, sortedRoles } = getSortedMembers(members);
    const allMembersFlat = sortedRoles.flatMap((roleName) => grouped[roleName]);
    const allUserIds = allMembersFlat.map((member) => member.user_id);

    const allCurrentlySelected =
      allUserIds.length > 0 &&
      allUserIds.every((id) => selectedUserIds.has(id));

    if (allCurrentlySelected) {
      setSelectedUserIds(new Set());
    } else {
      setSelectedUserIds(new Set(allUserIds));
    }
  }, [members, selectedUserIds]);

  const handleRoleCheckboxChange = useCallback(
    (roleName: string) => {
      const { grouped } = getSortedMembers(members);
      const userIds = grouped[roleName]?.map((m) => m.user_id) || [];

      const allCurrentlySelectedForRole =
        userIds.length > 0 && userIds.every((id) => selectedUserIds.has(id));

      setSelectedUserIds((prev) => {
        const newSet = new Set(prev);
        if (allCurrentlySelectedForRole) {
          userIds.forEach((id) => newSet.delete(id));
        } else {
          userIds.forEach((id) => newSet.add(id));
        }
        return newSet;
      });
    },
    [members, selectedUserIds]
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
