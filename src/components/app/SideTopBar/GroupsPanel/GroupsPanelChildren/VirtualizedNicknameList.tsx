"use client";
import { useVirtualizer } from "@tanstack/react-virtual";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { VirtualizedNicknameListProps } from "@/components/app/SideTopBar/groups/GroupsPanelChildren/VirtualizedNicknameList.types";

export default function VirtualizedNicknameList({
  nicknames,
}: VirtualizedNicknameListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: nicknames.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 3,
  });

  return (
    <div
      ref={parentRef}
      className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
      style={{ height: `${Math.min(6, nicknames.length) * 44}px` }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const nickname = nicknames[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
                padding: "0 2px 2px 2px",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: virtualItem.index * 0.02,
                }}
                className="h-full"
              >
                <div className="text-xs bg-context-bar p-2 rounded flex items-center gap-2 h-full">
                  <div className="flex-shrink-0">
                    <Image
                      src={nickname.avatar_url}
                      height={20}
                      width={20}
                      alt={nickname.user_tag}
                      className="rounded-full ring-1 ring-zinc-700"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-text-primary font-medium truncate text-xs">
                      {nickname.user_tag}
                    </div>
                    <div className="text-text-secondary truncate text-xs">
                      {nickname.nickname}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
