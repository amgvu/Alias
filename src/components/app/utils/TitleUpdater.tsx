"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function TitleUpdater() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.name) {
      document.title = `${session.user.name} | Alias`;
    }
    return () => {
      document.title = "Alias";
    };
  }, [session]);

  return null;
}
