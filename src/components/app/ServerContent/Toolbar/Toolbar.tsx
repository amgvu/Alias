"use client";

import SelectionTool from "./SelectionTool/SelectionTool";
import ApplyTool from "./ApplyTool/ApplyTool";

import { ToolbarProps } from "@/components/app/ServerContent/Toolbar/Toolbar.types";

export default function Toolbar({
  members,
  onUpdateSelectedNicknames,
  selectedUserIds,
  selectedServer,
  showCheckboxes,
  setShowCheckboxes,
}: ToolbarProps) {
  return (
    <div>
      <div className="bg-panel z-4 fixed w-screen translate-x-[111.0px] translate-y-8 p-[9.0px] border-border border-r border-t border-b">
        <SelectionTool
          selectedServer={selectedServer}
          showCheckboxes={showCheckboxes}
          setShowCheckboxes={setShowCheckboxes}
        />

        <ApplyTool
          members={members}
          onUpdateSelectedNicknames={onUpdateSelectedNicknames}
          selectedUserIds={selectedUserIds}
          selectedServer={selectedServer}
        />
      </div>
    </div>
  );
}
