"use client";
import { Button } from "@/components/ui/button";
import { SquareDashedMousePointer } from "lucide-react";

import { SelectionToolProps } from "@/types/selectionTool";

export default function SelectionTool({
  selectedServer,
  showCheckboxes,
  setShowCheckboxes,
}: SelectionToolProps) {
  return (
    <Button
      onClick={() => setShowCheckboxes(!showCheckboxes)}
      className="p-2 ml-3 bg-button border border-border enabled:border-border-active rounded-md disabled:bg-transparent disabled:text-text-disabled disabled:cursor-not-allowed cursor-pointer text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] text-text-primary hover:bg-button-hover"
      disabled={!selectedServer}
    >
      <SquareDashedMousePointer className="w-4 h-4 sm:w-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 inline-block" />
      {showCheckboxes ? "Unselect" : "Select"}
    </Button>
  );
}
