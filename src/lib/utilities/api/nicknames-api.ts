import { Nickname } from "@/types/types";
import { SupabaseClient } from "@supabase/supabase-js";

export const updateNickname = async (
  guildId: string,
  userId: string,
  nickname: string
) => {
  const response = await fetch(
    "https://worble-production-a5eb.up.railway.app/api/changeNickname",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guild_id: guildId,
        user_id: userId,
        nickname,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 403 && errorData.code === 50013) {
      throw new Error(
        "Cannot change nickname of server owner or users with higher roles"
      );
    }
    throw new Error(errorData.message || "Failed to update nickname");
  }

  return response.json();
};

export const fetchNicknames = async (
  supabase: SupabaseClient,
  guild_id: string,
  userId: string
): Promise<Nickname[]> => {
  try {
    const { data, error } = await supabase
      .from("nicknames")
      .select("*")
      .eq("guild_id", guild_id)
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(`Failed to fetch nicknames: ${error.message}`);
    }
    return data || [];
  } catch (err) {
    console.error("Unexpected error in fetchNicknames:", err);
    throw err;
  }
};

export const saveNicknames = async (
  supabase: SupabaseClient,
  guildId: string,
  nicknames: Nickname[]
): Promise<{
  message: string;
  savedNicknames: Array<{
    guild_id: string;
    user_id: string;
    user_tag: string;
    nickname: string;
    updated_at: string;
    is_active: boolean;
  }>;
}> => {
  const validNicknames: {
    guild_id: string;
    user_id: string;
    user_tag: string;
    nickname: string;
    updated_at: string;
    is_active: boolean;
  }[] = nicknames.map((n) => ({
    guild_id: guildId,
    user_id: n.userId,
    user_tag: n.userTag || "",
    nickname: (n.nickname ?? "").trim(),
    updated_at: new Date().toISOString(),
    is_active: true,
  }));

  const upsertResults = await Promise.all(
    validNicknames.map(async (nickname) => {
      const { data: existingNicknames, error: fetchError } = await supabase
        .from("nicknames")
        .select("*")
        .eq("guild_id", nickname.guild_id)
        .eq("user_id", nickname.user_id)
        .eq("nickname", nickname.nickname)
        .maybeSingle();

      if (fetchError) {
        console.error("Error checking existing nickname:", fetchError);
        return null;
      }

      if (existingNicknames) {
        return existingNicknames;
      }

      await supabase
        .from("nicknames")
        .update({ is_active: false })
        .eq("guild_id", nickname.guild_id)
        .eq("user_id", nickname.user_id)
        .eq("is_active", true);

      const { data, error } = await supabase
        .from("nicknames")
        .insert(nickname)
        .select();

      if (error) {
        console.error("Error saving nickname:", error);
        return null;
      }

      return data[0];
    })
  );

  const savedNicknames = upsertResults.filter((result) => result !== null);

  if (savedNicknames.length === 0) {
    throw new Error("Failed to save any nicknames.");
  }

  return {
    message: "Nicknames processed successfully.",
    savedNicknames: savedNicknames,
  };
};

export const deleteNickname = async (
  supabase: SupabaseClient,
  guildId: string,
  userId: string,
  nickname: string
): Promise<void> => {
  const { error } = await supabase
    .from("nicknames")
    .delete()
    .eq("guild_id", guildId)
    .eq("user_id", userId)
    .eq("nickname", nickname);

  if (error) {
    throw new Error(`Failed to delete nickname: ${error.message}`);
  }
};
