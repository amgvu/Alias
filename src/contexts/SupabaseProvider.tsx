"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";

interface SupabaseContextType {
  supabase: SupabaseClient | null;
}

const SupabaseContext = createContext<SupabaseContextType>({ supabase: null });

export const SupabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session, status } = useSession();
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.supabaseAccessToken) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

      if (!supabaseUrl || !supabaseAnonKey) {
        console.error(
          "Supabase URL or Anon Key are not defined in environment variables."
        );
        return;
      }

      const client = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: {
            Authorization: `Bearer ${session.supabaseAccessToken}`,
          },
        },
      });
      setSupabase(client);
    } else if (status === "unauthenticated" || status === "loading") {
      setSupabase(null);
    }
  }, [session, status]);

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};
