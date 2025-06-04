import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      discordId?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      guildId?: string;
    };
    supabaseAccessToken?: string;
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }

  interface JWT {
    accessToken?: string;
    id?: string;
    guildId?: string;
  }
}
