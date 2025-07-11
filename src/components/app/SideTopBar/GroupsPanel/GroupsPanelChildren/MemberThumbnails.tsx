"use client";
import Image from "next/image";
import { styles } from "../GroupsPanel.styles";

import { MemberThumbnailsProps } from "@/components/app/SideTopBar/groups/GroupsPanelChildren/MemberThumbnails.types";

export const MemberThumbnails = ({ visible, extra }: MemberThumbnailsProps) => {
  return (
    <div className={styles.memberThumbnailsWrapper}>
      {visible.map((n, idx) => (
        <div
          key={n.user_id}
          className="relative"
          style={{ marginLeft: idx > 0 ? "-8px" : "0" }}
        >
          <Image
            src={n.avatar_url}
            height={24}
            width={24}
            alt={n.user_tag}
            className="rounded-full border-2 border-card-panel bg-card-panel"
          />
        </div>
      ))}
      {extra > 0 && (
        <div
          className={styles.extraMemberCount}
          style={{ marginLeft: visible.length > 0 ? "-8px" : "0" }}
        >
          +{extra}
        </div>
      )}
    </div>
  );
};
