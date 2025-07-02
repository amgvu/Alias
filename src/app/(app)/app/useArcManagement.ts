/* eslint-disable @typescript-eslint/no-unused-vars */
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
  fetchArcs,
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
  const [arcs, setArcs] = useState<Arc[]>([]);
  const [newArcName, setNewArcName] = useState("");

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
          console.error("Failed to fetch group nicknames:", error);
        }
      }
    };

    loadArcNicknames();
  }, [selectedArc, setMembers, supabase, initialFetchedNicknames]);

  const handleCreateGroup = async (
    groupName: string,
    selectedMembers: Member[]
  ) => {
    if (!supabase) {
      alert("Database connection not available. Please try again.");
      return;
    }

    if (!selectedServer) {
      alert("Please select a server first.");
      return;
    }

    if (!groupName.trim()) {
      alert("Please enter a group name.");
      return;
    }

    if (selectedMembers.length === 0) {
      alert("Please select at least one member for the group.");
      return;
    }

    setIsSavingArc(true);

    try {
      const existingArc = await checkExistingArc(
        supabase,
        selectedServer.id,
        groupName.trim()
      );

      let targetArc: Arc;

      if (existingArc) {
        const confirmOverwrite = window.confirm(
          "A group with this name already exists. Do you want to overwrite it with the new members?"
        );

        if (!confirmOverwrite) {
          return;
        }

        await deleteArcNicknames(supabase, existingArc.id);
        targetArc = existingArc;
      } else {
        targetArc = await createArc(
          supabase,
          selectedServer.id,
          groupName.trim()
        );
      }

      const newNicknames: ArcNickname[] = selectedMembers.map((member) => ({
        arc_id: targetArc.id!,
        guild_id: selectedServer.id,
        user_id: member.user_id,
        nickname: member.nickname,
        user_tag: member.userTag || member.username,
        avatar_url: member.avatar_url || "",
      }));

      await saveArcNicknames(supabase, newNicknames);

      setSelectedArc(targetArc);

      const fetchedArcs = await fetchArcs(supabase, selectedServer.id);
      setArcs(fetchedArcs);

      setNewArcName("");
    } catch (error) {
      console.error("Failed to create/update group:", error);
      alert("Failed to create group. Please try again.");
    } finally {
      setIsSavingArc(false);
    }
  };

  return {
    selectedArc,
    setSelectedArc,
    isSavingArc,
    handleCreateGroup,
  };
};
