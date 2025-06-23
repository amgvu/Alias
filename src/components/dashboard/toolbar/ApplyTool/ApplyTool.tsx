import { Server } from "@/types/types";
import { CheckCheck } from "lucide-react";
import { Member } from "@/types/types";
import { Button } from "@/components/ui/button";

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
    <Button
      onClick={handleApply}
      className="p-2 bg-button ml-2 text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] border border-border enabled:border-border-active rounded-md disabled:bg-transparent disabled:text-text-disabled disabled:cursor-not-allowed cursor-pointer text-text-primary hover:bg-button-hover"
      disabled={!selectedServer || selectedUserIds.length === 0}
    >
      <CheckCheck className="w-4 h-4 sm:w-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 inline-block" />
      Apply
    </Button>
  );
}
