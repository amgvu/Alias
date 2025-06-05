import { Server } from "@/types/types";

export const fetchServers = async (
  accessToken: string,
  userId: string
): Promise<Server[]> => {
  const response = await fetch("http://localhost:3000/api/servers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken,
      userId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to fetch servers: ${errorData.error || response.statusText}`
    );
  }

  return response.json();
};

export const fetchMembers = async (guildId: string) => {
  const response = await fetch(`http://localhost:3000/api/members/${guildId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch members");
  }
  return response.json();
};
