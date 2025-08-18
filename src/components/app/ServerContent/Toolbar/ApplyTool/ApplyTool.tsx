"use client";
import { LuCheckCheck } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { ApplyToolProps } from "@/components/app/ServerContent/Toolbar/Toolbar.types";

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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="p-2 bg-button ml-2 text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] border border-border enabled:border-border-active rounded-md disabled:bg-transparent disabled:text-text-disabled disabled:cursor-not-allowed cursor-pointer text-text-primary hover:bg-button-hover"
          disabled={!selectedServer || selectedUserIds.length === 0}
        >
          <LuCheckCheck className="w-4 h-4 sm:w-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 inline-block" />
          Apply
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-text-primary">
            Apply {selectedUserIds.length}{" "}
            {selectedUserIds.length > 1 ? "nicknames" : "nickname"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-text-secondary">
            Are you sure you want to apply the{" "}
            {selectedUserIds.length > 1 ? "nicknames" : "nickname"} to{" "}
            <span className="font-bold">
              {selectedUserIds.length}{" "}
              {selectedUserIds.length > 1 ? "members" : "member"}{" "}
            </span>
            in the server?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="p-2 hover:text-text-primary bg-button ml-2 text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] border border-border enabled:border-border-active rounded-md disabled:bg-transparent disabled:text-text-disabled disabled:cursor-not-allowed cursor-pointer text-text-primary hover:bg-button-hover">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleApply}
            className="p-2 bg-zinc-200 ml-2 text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] border border-border enabled:border-border-active rounded-md disabled:bg-transparent disabled:text-text-disabled disabled:cursor-not-allowed cursor-pointer text-zinc-950 hover:bg-zinc-300"
            disabled={!selectedServer || selectedUserIds.length === 0}
          >
            <LuCheckCheck className="w-4 h-4 sm:w-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 inline-block" />
            Yes, apply {selectedUserIds.length}{" "}
            {selectedUserIds.length > 1 ? "nicknames" : "nickname"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
