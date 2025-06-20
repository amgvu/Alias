import { Arc, ArcNickname } from "@/types/types";
import { SupabaseClient } from "@supabase/supabase-js";

export const createArc = async (
  supabase: SupabaseClient,
  guildId: string,
  arcName: string
): Promise<Arc> => {
  const { data, error } = await supabase
    .from("arcs")
    .insert([{ guild_id: guildId, arc_name: arcName }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteArc = async (
  supabase: SupabaseClient,
  arcId: number
): Promise<void> => {
  const { data: arcNicknames, error: fetchError } = await supabase
    .from("arc_nicknames")
    .select("guild_id, user_id, nickname")
    .eq("arc_id", arcId);

  if (fetchError) {
    throw new Error(`Failed to fetch arc nicknames: ${fetchError.message}`);
  }

  if (arcNicknames && arcNicknames.length > 0) {
    for (const nickname of arcNicknames) {
      const { error: deleteNicknameError } = await supabase
        .from("nicknames")
        .delete()
        .eq("guild_id", nickname.guild_id)
        .eq("user_id", nickname.user_id)
        .eq("nickname", nickname.nickname);

      if (deleteNicknameError) {
        throw new Error(
          `Failed to delete nickname: ${deleteNicknameError.message}`
        );
      }
    }
  }

  const { error: deleteArcNicknamesError } = await supabase
    .from("arc_nicknames")
    .delete()
    .eq("arc_id", arcId);

  if (deleteArcNicknamesError) {
    throw new Error(
      `Failed to delete arc nicknames: ${deleteArcNicknamesError.message}`
    );
  }

  const { error: deleteArcError } = await supabase
    .from("arcs")
    .delete()
    .eq("id", arcId);

  if (deleteArcError) {
    throw new Error(`Failed to delete arc: ${deleteArcError.message}`);
  }
};

export const fetchArcs = async (
  supabase: SupabaseClient,
  guild_id: string
): Promise<Arc[]> => {
  const { data, error } = await supabase
    .from("arcs")
    .select("*")
    .eq("guild_id", guild_id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const saveArcNicknames = async (
  supabase: SupabaseClient,
  arcNicknames: ArcNickname[]
): Promise<void> => {
  const { error } = await supabase.from("arc_nicknames").insert(
    arcNicknames.map((nickname) => ({
      arc_id: nickname.arc_id,
      guild_id: nickname.guild_id,
      user_id: nickname.user_id,
      nickname: nickname.nickname,
      user_tag: nickname.user_tag,
      avatar_url: nickname.avatar_url || "",
    }))
  );

  if (error) {
    throw new Error(error.message);
  }
};

export const checkExistingArc = async (
  supabase: SupabaseClient,
  guildId: string,
  arcName: string
): Promise<Arc | null> => {
  const { data, error } = await supabase
    .from("arcs")
    .select("*")
    .eq("guild_id", guildId)
    .eq("arc_name", arcName)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }

  return data;
};

export const fetchArcNicknames = async (
  supabase: SupabaseClient,
  arcId: number
): Promise<ArcNickname[]> => {
  const { data, error } = await supabase
    .from("arc_nicknames")
    .select("*")
    .eq("arc_id", arcId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteArcNicknames = async (
  supabase: SupabaseClient,
  arcId: number
): Promise<void> => {
  const { error } = await supabase
    .from("arc_nicknames")
    .delete()
    .eq("arc_id", arcId);

  if (error) {
    throw new Error(error.message);
  }
};

const compareNicknames = (
  nicknames1: ArcNickname[],
  nicknames2: ArcNickname[]
): boolean => {
  if (nicknames1.length !== nicknames2.length) {
    return false;
  }

  const sorted1 = nicknames1.sort((a, b) => a.user_id.localeCompare(b.user_id));
  const sorted2 = nicknames2.sort((a, b) => a.user_id.localeCompare(b.user_id));

  for (let i = 0; i < sorted1.length; i++) {
    if (
      sorted1[i].user_id !== sorted2[i].user_id ||
      sorted1[i].nickname !== sorted2[i].nickname
    ) {
      return false;
    }
  }

  return true;
};

export const checkDuplicateArcNicknames = async (
  supabase: SupabaseClient,
  guildId: string,
  newNicknames: ArcNickname[]
): Promise<boolean> => {
  const { data: arcs, error: arcsError } = await supabase
    .from("arcs")
    .select("id")
    .eq("guild_id", guildId);

  if (arcsError) {
    throw new Error(arcsError.message);
  }

  for (const arc of arcs) {
    const existingNicknames = await fetchArcNicknames(supabase, arc.id);

    if (compareNicknames(newNicknames, existingNicknames)) {
      return true;
    }
  }

  return false;
};
