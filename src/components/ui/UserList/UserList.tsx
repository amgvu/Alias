import { motion } from "framer-motion";
import { UserListCard } from "../UserListCard/UserListCard";
import { styles } from "./UserList.styles";
import { Checkbox } from "@/components/ui/checkbox";
import { Member } from "@/types/types";
import { useState, useEffect } from "react";

interface UserListProps {
  members: Member[];
  isUpdating: string | null;
  selectedServer: string;
  onNicknameChange: (index: number, nickname: string) => void;
  onApplyNickname: (userId: string, nickname: string) => void;
  isApplyingAll: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
}

const roleGroupVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.3,
    },
  }),
};

const shiftVariants = {
  initial: { y: 0 },
  animate: (index: number) => ({
    y: [0, 10, 0],
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
      delay: index * 0.06,
    },
  }),
};

const checkboxContainerVariants = {
  hidden: { width: 0, opacity: 0, x: -10, transition: { duration: 0.2 } },
  visible: { width: "24px", opacity: 1, x: 0, transition: { duration: 0.2 } },
};

export const DSUserList: React.FC<UserListProps> = ({
  members,
  isUpdating,
  selectedServer,
  onNicknameChange,
  onApplyNickname,
  isApplyingAll,
  onSelectionChange,
}) => {
  const [animationKey, setAnimationKey] = useState(0);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedUserIds);
    }
  }, [selectedUserIds, onSelectionChange]);

  useEffect(() => {
    if (isApplyingAll) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [isApplyingAll]);

  const groupedMembers = members.reduce(
    (acc: Record<string, Member[]>, member) => {
      const highestRole = member.roles[0]?.name || "No Role";
      if (!acc[highestRole]) {
        acc[highestRole] = [];
      }
      acc[highestRole].push(member);
      return acc;
    },
    {}
  );

  const sortedRoles = Object.keys(groupedMembers).sort((a, b) => {
    const roleAPosition =
      members.find((m) => m.roles[0]?.name === a)?.roles[0]?.position ?? -1;
    const roleBPosition =
      members.find((m) => m.roles[0]?.name === b)?.roles[0]?.position ?? -1;
    return roleBPosition - roleAPosition;
  });

  const memberIndices = members.reduce((acc, member, index) => {
    acc[member.user_id] = index;
    return acc;
  }, {} as Record<string, number>);

  const allUserIds = members.map((m) => m.user_id);
  const areAllMembersSelected =
    allUserIds.length > 0 &&
    allUserIds.every((id) => selectedUserIds.includes(id));

  const handleGlobalCheckboxChange = () => {
    if (areAllMembersSelected) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(allUserIds);
    }
  };

  const areAllRoleMembersSelected = (roleName: string) => {
    const userIds = groupedMembers[roleName].map((m) => m.user_id);
    return userIds.every((id) => selectedUserIds.includes(id));
  };

  const handleRoleCheckboxChange = (roleName: string) => {
    const userIds = groupedMembers[roleName].map((m) => m.user_id);
    const allSelected = areAllRoleMembersSelected(roleName);
    if (allSelected) {
      setSelectedUserIds((prev) => prev.filter((id) => !userIds.includes(id)));
    } else {
      setSelectedUserIds((prev) => [
        ...prev,
        ...userIds.filter((id) => !prev.includes(id)),
      ]);
    }
  };

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.container}>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCheckboxes(!showCheckboxes)}
            className="px-4 cursor-pointer py-2 bg-zinc-900 hover:bg-zinc-800 font-semibold rounded-md mb-4 shadow-lg transition-colors duration-200"
          >
            {showCheckboxes ? "Unselect" : "Select Users"}
          </button>
        </div>
        <div className="flex items-center mb-1">
          <motion.div
            variants={checkboxContainerVariants}
            initial="hidden"
            animate={showCheckboxes ? "visible" : "hidden"}
            className="overflow-hidden flex-shrink-0"
          >
            <Checkbox
              className="border-zinc-300 border-2 cursor-pointer"
              checked={areAllMembersSelected}
              onCheckedChange={handleGlobalCheckboxChange}
            />
          </motion.div>
          {showCheckboxes && <span className="mb-1 ml-1">Select All</span>}
        </div>
        {sortedRoles.map((roleName, roleIndex) => (
          <motion.div
            key={roleName}
            custom={roleIndex}
            initial="hidden"
            animate="visible"
            variants={roleGroupVariants}
            className="relative"
          >
            <div className="flex items-center mt-3 mb-1">
              <motion.div
                variants={checkboxContainerVariants}
                initial="hidden"
                animate={showCheckboxes ? "visible" : "hidden"}
                className="overflow-hidden flex-shrink-0"
              >
                <Checkbox
                  className="border-zinc-300 cursor-pointer"
                  checked={areAllRoleMembersSelected(roleName)}
                  onCheckedChange={() => handleRoleCheckboxChange(roleName)}
                />
              </motion.div>
              <span className="text-md text-zinc-400 text-sm font-medium border-[#252525] ml-2">
                {roleName}
              </span>
            </div>
            <div className="relative">
              <motion.div
                variants={checkboxContainerVariants}
                initial="hidden"
                animate={showCheckboxes ? "visible" : "hidden"}
                className="overflow-hidden flex-shrink-0"
              >
                <div className="absolute left-[9.5px] top-[-4px] bottom-0 w-px bg-zinc-800" />{" "}
              </motion.div>
              <div className="flex flex-col gap-1 relative z-10">
                {groupedMembers[roleName].map((member) => (
                  <motion.div
                    key={`${member.user_id}-${animationKey}`}
                    className="mb-1"
                    custom={memberIndices[member.user_id]}
                    initial="initial"
                    variants={shiftVariants}
                    animate={isApplyingAll ? "animate" : "initial"}
                  >
                    <div className="flex items-center">
                      <motion.div
                        variants={checkboxContainerVariants}
                        initial="hidden"
                        animate={showCheckboxes ? "visible" : "hidden"}
                        className="overflow-hidden flex-shrink-0"
                      >
                        <Checkbox
                          className="border-zinc-500 bg-zinc-950 cursor-pointer transition-all"
                          checked={selectedUserIds.includes(member.user_id)}
                          onCheckedChange={() => {
                            setSelectedUserIds((prev) =>
                              prev.includes(member.user_id)
                                ? prev.filter((id) => id !== member.user_id)
                                : [...prev, member.user_id]
                            );
                          }}
                        />
                      </motion.div>
                      <UserListCard
                        member={member}
                        selectedServer={selectedServer}
                        isUpdating={isUpdating === member.user_id}
                        isApplyingAll={isApplyingAll}
                        onNicknameChange={(nickname) => {
                          onNicknameChange(
                            memberIndices[member.user_id],
                            nickname
                          );
                        }}
                        onApplyNickname={() =>
                          onApplyNickname(member.user_id, member.nickname)
                        }
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DSUserList;
