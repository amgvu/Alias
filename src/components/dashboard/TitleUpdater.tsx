"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function TitleUpdater() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.name) {
      document.title = `${session.user.name}'s Dashboard | Arclify`;
    }
    return () => {
      document.title = "Arclify";
    };
  }, [session]);

  return null;
}
