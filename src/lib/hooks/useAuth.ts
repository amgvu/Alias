import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("discord");
    }
  }, [status]); // change this in future to handle diff routes

  const handleDiscordLogin = () => {
    signIn("discord", { callbackUrl: "/app" });
  };

  const handleDiscordLogout = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  return { session, status, handleDiscordLogin, handleDiscordLogout };
};
