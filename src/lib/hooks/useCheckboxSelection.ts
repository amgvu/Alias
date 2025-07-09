import { useState, useEffect, useCallback } from "react";
import { Member } from "@/types/types";
import { getSortedMembers } from "@/lib/utilities";
import { checkboxContainerVariants } from "@/lib/data";

interface UseCheckboxSelectionProps {
  fetchedMembers: Member[];
  onSelectedUserIds?: (selectedIds: string[]) => void;
}

export const useCheckboxSelection = ({
  fetchedMembers,
  onSelectedUserIds,
}: UseCheckboxSelectionProps) => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedUserIdSets, setSelectedUserIdSets] = useState<Set<string>>(
    new Set()
  );

  const areAllMembersSelected = useCallback(() => {
    const { grouped, sortedRoles } = getSortedMembers(fetchedMembers);
    const allMembersFlat = sortedRoles.flatMap((roleName) => grouped[roleName]);
    const allUserIds = allMembersFlat.map((member) => member.user_id);
    return (
      allUserIds.length > 0 &&
      allUserIds.every((id) => selectedUserIdSets.has(id))
    );
  }, [fetchedMembers, selectedUserIdSets]);

  const areAllRoleMembersSelected = useCallback(
    (roleName: string) => {
      const { grouped } = getSortedMembers(fetchedMembers);
      const userIds = grouped[roleName]?.map((m) => m.user_id) || [];
      return (
        userIds.length > 0 && userIds.every((id) => selectedUserIdSets.has(id))
      );
    },
    [selectedUserIdSets, fetchedMembers]
  );

  const handleCheckboxToggle = useCallback((userId: string) => {
    setSelectedUserIdSets((prev) => {
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
    const { grouped, sortedRoles } = getSortedMembers(fetchedMembers);
    const allMembersFlat = sortedRoles.flatMap((roleName) => grouped[roleName]);
    const allUserIds = allMembersFlat.map((member) => member.user_id);

    const allCurrentlySelected =
      allUserIds.length > 0 &&
      allUserIds.every((id) => selectedUserIdSets.has(id));

    if (allCurrentlySelected) {
      setSelectedUserIdSets(new Set());
    } else {
      setSelectedUserIdSets(new Set(allUserIds));
    }
  }, [fetchedMembers, selectedUserIdSets]);

  const handleRoleCheckboxChange = useCallback(
    (roleName: string) => {
      const { grouped } = getSortedMembers(fetchedMembers);
      const userIds = grouped[roleName]?.map((m) => m.user_id) || [];

      const allCurrentlySelectedForRole =
        userIds.length > 0 && userIds.every((id) => selectedUserIdSets.has(id));

      setSelectedUserIdSets((prev) => {
        const newSet = new Set(prev);
        if (allCurrentlySelectedForRole) {
          userIds.forEach((id) => newSet.delete(id));
        } else {
          userIds.forEach((id) => newSet.add(id));
        }
        return newSet;
      });
    },
    [fetchedMembers, selectedUserIdSets]
  );

  useEffect(() => {
    if (!showCheckboxes) {
      setSelectedUserIdSets(new Set());
    }
  }, [showCheckboxes]);

  useEffect(() => {
    if (onSelectedUserIds) {
      onSelectedUserIds(Array.from(selectedUserIdSets));
    }
  }, [selectedUserIdSets, onSelectedUserIds]);

  return {
    selectedUserIds,
    showCheckboxes,
    setShowCheckboxes,
    selectedUserIdSets,
    setSelectedUserIds,
    areAllMembersSelected,
    areAllRoleMembersSelected,
    handleCheckboxToggle,
    handleGlobalCheckboxChange,
    handleRoleCheckboxChange,
    checkboxContainerVariants,
  };
};
