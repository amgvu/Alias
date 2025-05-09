import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchServers } from "@/lib/utilities/api";
import { Server } from "@/types/types";

export const useServers = () => {
  const { data: session } = useSession();
  const [servers, setServers] = useState<Server[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getServers = async () => {
      if (session?.accessToken && session.user?.id) {
        const cachedServers = localStorage.getItem("cachedServers");
        const cachedTimestamp = localStorage.getItem("serversTimestamp");

        const pageLoadTimestamp = sessionStorage.getItem("pageLoadTimestamp");
        const isCacheValid =
          cachedServers &&
          cachedTimestamp &&
          pageLoadTimestamp &&
          cachedTimestamp > pageLoadTimestamp;

        if (isCacheValid) {
          try {
            const parsedServers = JSON.parse(cachedServers);
            setServers(parsedServers);
            return;
          } catch (err) {
            console.error("Failed to parse cached servers", err);
          }
        }

        try {
          const data = await fetchServers(session.accessToken, session.user.id);
          setServers(data);

          localStorage.setItem("cachedServers", JSON.stringify(data));
          localStorage.setItem("serversTimestamp", Date.now().toString());
        } catch (error) {
          setError(
            error instanceof Error ? error.message : "Failed to fetch servers"
          );
        }
      }
    };

    if (!sessionStorage.getItem("pageLoadTimestamp")) {
      sessionStorage.getItem("pageLoadTimestamp") ||
        sessionStorage.setItem("pageLoadTimestamp", Date.now().toString());
    }

    if (session) {
      const timeoutId = setTimeout(() => {
        getServers();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [session]);

  return { servers, error };
};
