import { Server } from "@/types/types";
import { CheckCheck } from "lucide-react";
import { Member } from "@/types/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";

interface ApplyToolProps {
  members: Member[];
  onUpdateSelectedNicknames: (selectedMembers: Member[]) => void;
  selectedUserIds: string[];
  selectedServer: Server | null;
}

export default function ApplyTool({
  members,
  onUpdateSelectedNicknames,
  selectedUserIds,
  selectedServer,
}: ApplyToolProps) {
  const handleApply = () => {
    if (!selectedUserIds || selectedUserIds.length === 0) return;
    const selectedMembers = members.filter((member) =>
      selectedUserIds.includes(member.user_id)
    );
    onUpdateSelectedNicknames(selectedMembers);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="p-2 bg-button ml-2 text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] border border-border enabled:border-border-active rounded-md disabled:bg-transparent disabled:text-text-disabled disabled:cursor-not-allowed cursor-pointer text-text-primary hover:bg-button-hover"
          disabled={!selectedServer || selectedUserIds.length === 0}
        >
          <CheckCheck className="w-4 h-4 sm:w-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 inline-block" />
          Apply
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-text-primary">
            Apply {selectedUserIds.length} nicknames
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to apply the nicknames to{" "}
            {selectedUserIds.length} members in the server?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={handleApply}
              className="p-2 bg-button ml-2 text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] border border-border enabled:border-border-active rounded-md disabled:bg-transparent disabled:text-text-disabled disabled:cursor-not-allowed cursor-pointer text-text-primary hover:bg-button-hover"
              disabled={!selectedServer || selectedUserIds.length === 0}
            >
              <CheckCheck className="w-4 h-4 sm:w-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 inline-block" />
              Yes, apply {selectedUserIds.length} nicknames
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
