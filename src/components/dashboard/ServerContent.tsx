import { DSUserList } from "@/components";
import { TitleUpdater } from "./TitleUpdater";
import { Member } from "@/types/types";

interface ServerContentProps {
  selectedServer: string | null;
  serversError: string | null;
  membersError: string | null;
  members: Member[];
  isUpdating: string | null;
  isApplyingAll: boolean;
  onNicknameChange: (index: number, nickname: string) => void;
  onApplyNickname: (userId: string, nickname: string) => void;
  onApplyToSelection: (selectedMembers: Member[]) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  showCheckboxes: boolean;
  setShowCheckboxes: (show: boolean) => void;
}

export default function ServerContent({
  selectedServer,
  serversError,
  membersError,
  members,
  isUpdating,
  isApplyingAll,
  onNicknameChange,
  onApplyNickname,
  onSelectionChange,
  showCheckboxes,
  setShowCheckboxes,
}: ServerContentProps) {
  return (
    <div className="flex flex-col">
      <TitleUpdater />
      <div className="text-4xl text-zinc-600 font-semibold text-center py-2"></div>
      <div className="justify-items-center">
        {serversError || membersError ? (
          <div className="mb-3 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400">
            {serversError || membersError}
          </div>
        ) : selectedServer ? (
          <DSUserList
            selectedServer={selectedServer}
            members={members}
            isUpdating={isUpdating}
            onNicknameChange={onNicknameChange}
            onApplyNickname={onApplyNickname}
            isApplyingAll={isApplyingAll}
            onSelectionChange={onSelectionChange}
            showCheckboxes={showCheckboxes}
            setShowCheckboxes={setShowCheckboxes}
          />
        ) : (
          <div className="text-center font-semibold text-4xl text-zinc-500 py-5">
            Select a server to view and manage members
          </div>
        )}
      </div>
    </div>
  );
}
