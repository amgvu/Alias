import { Server } from "@/types/types";
import { CheckCheck } from "lucide-react";
import { Member } from "@/types/types";

interface ApplyToolProps {
  members: Member[];
  onApplyToSelection: (selectedMembers: Member[]) => void;
  selectedUserIds: string[];
  selectedServer: Server | null;
}

export function ApplyTool({
  members,
  onApplyToSelection,
  selectedUserIds,
  selectedServer,
}: ApplyToolProps) {
  const handleApply = () => {
    if (!selectedUserIds || selectedUserIds.length === 0) return;
    const selectedMembers = members.filter((member) =>
      selectedUserIds.includes(member.user_id)
    );
    onApplyToSelection(selectedMembers);
  };

  return (
    <button
      onClick={handleApply}
      className="p-2 rounded-full disabled:bg-transparent disabled:text-text-disabled disabled:cursor-not-allowed cursor-pointer text-sm text-text-primary hover:bg-button-hover"
      disabled={!selectedServer || selectedUserIds.length === 0}
    >
      <CheckCheck className="w-4.5 h-4.5 inline-block mb-0.5 mr-1" />
      Apply
    </button>
  );
}
