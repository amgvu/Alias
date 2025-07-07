/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import jwt from "jsonwebtoken";
import { DiscordProfile } from "@/types/discord";

async function refreshDiscordAccessToken(token: any) {
  try {
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    });

    const response = await fetch("https://discord.com/api/oauth2/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: params.toString(),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      console.error("Discord refresh error:", refreshedTokens);
      throw new Error(
        refreshedTokens.error_description || "Failed to refresh Discord token"
      );
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      error: undefined,
    };
  } catch (error: any) {
    console.error("Error refreshing Discord access token:", error);

    return { ...token, error: "RefreshAccessTokenError" as const };
  }
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
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : undefined;
        token.id = (profile as DiscordProfile).id;
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      if (!token.refreshToken || token.error === "RefreshAccessTokenError") {
        console.warn(
          "No refresh token available or previous refresh failed. User needs to re-authenticate."
        );
        delete token.accessToken;
        delete token.refreshToken;
        delete token.accessTokenExpires;
        return { ...token, error: "RefreshAccessTokenError" as const };
      }

      return refreshDiscordAccessToken(token);
    },
    async session({ session, token }) {
      if (token.error === "RefreshAccessTokenError" || !token.accessToken) {
        throw new Error("TokenExpired");
      }

      session.accessToken = token.accessToken as string;
      session.user.id = token.sub as string;
      session.user.discordId = token.id as string;

      if (token.error) {
        session.error = token.error;
      }

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
