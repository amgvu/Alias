import { useSession, signIn, signOut } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();

  const handleDiscordLogin = () => {
    signIn("discord", { callbackUrl: "/app" });
  };

  const handleDiscordLogout = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  return { session, status, handleDiscordLogin, handleDiscordLogout };
};
