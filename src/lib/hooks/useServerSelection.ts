import { useState } from "react";
import { Server } from "@/types/types";
import { useServers } from "@/lib/hooks";

export const useServerSelection = () => {
  const { servers, error: serversError } = useServers();
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  const handleServerSelection = (value: string | Server) => {
    const selected =
      typeof value === "string"
        ? servers.find((server: Server) => server.name === value)
        : value;

    if (selected) {
      setSelectedServer(selected);
    } else {
      setSelectedServer(null);
    }
  };

  return {
    servers,
    serversError,
    selectedServer,
    handleServerSelection,
  };
};
