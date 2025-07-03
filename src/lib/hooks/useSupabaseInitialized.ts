import { useEffect } from "react";
import { useSupabase } from "@/contexts/SupabaseProvider";
import { useSession } from "next-auth/react";

export const useSupabaseInitialized = () => {
  const { supabase } = useSupabase();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (supabase) {
    }
  }, [supabase, session, status]);
};
