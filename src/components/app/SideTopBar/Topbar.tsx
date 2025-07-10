"use client";

import { Server } from "@/types/types";
import Image from "next/image";

interface TopbarProps {
  selectedServer: Server | null;
  className?: string;
}

export default function Topbar({
  selectedServer,
  className = "",
}: TopbarProps) {
  return (
    <div
      className={`
    fixed top-0 left-0 right-0 z-4
    bg-sidebar border-border
    h-[35px] text-center px-4
    ${className}
  `}
    >
      <div className="flex items-center -translate-y-0.5 justify-center h-full">
        {selectedServer && (
          <div className="flex items-center gap-2">
            <Image
              src={selectedServer.iconURL}
              alt="icon"
              width={32}
              height={32}
              className="w-5 rounded-sm h-5"
            />
            <span className="text-text-primary font-medium text-sm">
              {selectedServer.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
