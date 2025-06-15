import { useState, useEffect } from "react";
import { Arc, ArcNickname, Member, Server } from "@/types/types";
import { useSupabase } from "@/contexts/SupabaseProvider";
import { useSession } from "next-auth/react";
import {
  createArc,
  saveArcNicknames,
  checkExistingArc,
  deleteArcNicknames,
  fetchArcNicknames,
} from "@/lib/utilities";

export const useArcManagement = (
  selectedServer: Server | null,
  members: Member[],
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>
) => {
  const { supabase } = useSupabase();
  const { data: session, status } = useSession();
  const [selectedArc, setSelectedArc] = useState<Arc | null>(null);
  const [isSavingArc, setIsSavingArc] = useState(false);
  const [initialFetchedNicknames, setInitialFetchedNicknames] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (supabase) {
    }
  }, [supabase, session, status]);

  useEffect(() => {
    if (
      members.length > 0 &&
      Object.keys(initialFetchedNicknames).length === 0
    ) {
      const initialNicksMap = members.reduce((acc, member) => {
        acc[member.user_id] = member.nickname;
        return acc;
      }, {} as Record<string, string>);
      setInitialFetchedNicknames(initialNicksMap);
    }
  }, [members, initialFetchedNicknames]);

  useEffect(() => {
    const loadArcNicknames = async () => {
      if (!supabase) {
        return;
      }

      if (selectedArc) {
        try {
          const arcNicknames = await fetchArcNicknames(
            supabase,
            selectedArc.id
          );

          setMembers((prevMembers) => {
            return prevMembers.map((member) => {
              const arcNickname = arcNicknames.find(
                (an) => an.user_id === member.user_id
              );
              return arcNickname
                ? { ...member, nickname: arcNickname.nickname }
                : { ...member };
            });
          });
        } catch (error) {
          console.error("Failed to fetch arc nicknames:", error);
        }
      }
    };

    loadArcNicknames();
  }, [selectedArc, setMembers, supabase, initialFetchedNicknames]);

  const handleSaveArc = async () => {
    if (!supabase) {
      alert("Database connection not available. Please try again.");
      return;
    }

    if (!selectedServer || !selectedArc || !selectedArc.arc_name) {
      alert("Please select a server, arc, and ensure members are loaded.");
      return;
    }

    setIsSavingArc(true);

    try {
      const existingArc = await checkExistingArc(
        supabase,
        selectedServer.id,
        selectedArc.arc_name
      );

      if (existingArc) {
        const confirmOverwrite = window.confirm(
          "An arc with this name already exists. Do you want to overwrite it with the new set of nicknames?"
        );

        if (!confirmOverwrite) {
          return;
        }

        await deleteArcNicknames(supabase, existingArc.id);
      }

      const arc =
        existingArc ||
        (await createArc(supabase, selectedServer.id, selectedArc.arc_name));

      const newNicknames: ArcNickname[] = members.map((member) => ({
        arc_id: arc.id!,
        guild_id: selectedServer.id,
        user_id: member.user_id,
        nickname: member.nickname,
        userTag: member.userTag || member.username,
      }));

      await saveArcNicknames(supabase, newNicknames);
    } catch (error) {
      console.error(error);
      alert("Failed to save arc. Please try again.");
    } finally {
      setIsSavingArc(false);
    }
  };

  const handleCreateNewArc = async (newArcName: string) => {
    if (!supabase) {
      alert("Database connection not available. Please try again.");
      return;
    }

    try {
      const newArc = await createArc(
        supabase,
        selectedServer?.id ?? "",
        newArcName
      );
      setSelectedArc(newArc);
    } catch (error) {
      console.error("Failed to create new arc:", error);
      alert("Failed to create new arc. Please try again.");
    }
  };

  return {
    selectedArc,
    setSelectedArc,
    isSavingArc,
    handleSaveArc,
    handleCreateNewArc,
  };
};
