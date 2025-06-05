import { Server } from "@/types/types";

export const fetchServers = async (
  accessToken: string,
  userId: string
): Promise<Server[]> => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const response = await fetch(`${backendUrl}/api/servers`, {
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
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const response = await fetch(`${backendUrl}/api/members/${guildId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch members");
  }
  return response.json();
};
