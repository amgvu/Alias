import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import jwt from "jsonwebtoken";

interface DiscordProfile {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  email?: string;
  verified?: boolean;
}

const handler = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify guilds",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log("Session Callback - token:", token);
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.id = (profile as DiscordProfile).id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.sub as string;
      session.user.discordId = token.id as string;

      const supabaseSigningSecret = process.env.SUPABASE_JWT_SECRET;
      if (supabaseSigningSecret && session.user.id) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          sub: session.user.id,
          email: session.user.email,
          role: "authenticated",
        };
        session.supabaseAccessToken = jwt.sign(payload, supabaseSigningSecret);
      }
      return session;
    },
  },
  pages: {
    error: "/api/auth/error",
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET!,
});

export { handler as GET, handler as POST };
