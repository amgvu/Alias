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
        fixed top-0 left-0 right-0 z-4
        bg-sidebar border-border
        h-[35px] text-center px-4
        ${className}
      `}
    >
      <div className=" gap-4">
        {selectedServer && (
          <div className="gap-3 mt-1">
            <span className="text-text-primaryfont-medium text-sm">
              {selectedServer.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
