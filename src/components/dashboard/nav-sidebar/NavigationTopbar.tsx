import { Server } from "@/types/types";

interface NavigationTopBarProps {
  selectedServer: Server | null;
  className?: string;
}

export function NavigationTopBar({
  selectedServer,

  className = "",
}: NavigationTopBarProps) {
  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-25
        bg-[#09090b] border-b border-border
        h-[25px] text-center px-4
        shadow-sm
        ${className}
      `}
    >
      <div className=" gap-4">
        {selectedServer && (
          <div className=" gap-3">
            <span className="text-zinc-200 font-medium text-sm">
              {selectedServer.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
