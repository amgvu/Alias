import { useState, useEffect, useCallback } from "react";
import { Arc, ArcNickname, Member, Server } from "@/types/types";
import { useSupabase } from "@/contexts/SupabaseProvider";
import { useSupabaseInitialized } from "@/lib/hooks";
import {
  createArc,
  saveArcNicknames,
  checkExistingArc,
  deleteArc,
  deleteArcNicknames,
  fetchArcNicknames,
  fetchArcs,
} from "@/lib/utilities";
import { toast } from "sonner";

export const useArcManagement = (
  selectedServer: Server | null,
  members: Member[],
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>
) => {
  const { supabase } = useSupabase();
  const [selectedArc, setSelectedArc] = useState<Arc | null>(null);
  const [isSavingArc, setIsSavingArc] = useState(false);
  const [initialFetchedNicknames, setInitialFetchedNicknames] = useState<
    Record<string, string>
  >({});
  const [arcs, setArcs] = useState<Arc[]>([]);
  const [newArcName, setNewArcName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [removingArcIds, setRemovingArcIds] = useState<number[]>([]);
  const [arcNicknamesMap, setArcNicknamesMap] = useState<
    Record<number, ArcNickname[]>
  >({});
  const [arcMemberCounts, setArcMemberCounts] = useState<
    Record<number, number>
  >({});

  useSupabaseInitialized();

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
      toast("Database connection not available. Please try again.");
      return;
    }
    if (!selectedServer) {
      toast("Please select a server first.");
      return;
    }
    if (!groupName.trim()) {
      toast("Please enter a group name.");
      return;
    }
    if (selectedMembers.length === 0) {
      toast("Please select at least one member for the group.");
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
      toast("Failed to create group. Please try again.");
    } finally {
      setIsSavingArc(false);
    }
  };

  const loadArcsAndNicknames = useCallback(async () => {
    if (!supabase || !selectedServer) return;
    setIsLoading(true);
    try {
      const fetchedArcs = await fetchArcs(supabase, selectedServer.id);
      setArcs(fetchedArcs);

      const nicknamesMap: Record<number, ArcNickname[]> = {};
      const counts: Record<number, number> = {};

      await Promise.all(
        fetchedArcs.map(async (arc) => {
          try {
            const nicknames = await fetchArcNicknames(supabase, arc.id);
            nicknamesMap[arc.id] = nicknames;
            counts[arc.id] = nicknames.length;
          } catch {
            nicknamesMap[arc.id] = [];
            counts[arc.id] = 0;
          }
        })
      );

      setArcNicknamesMap(nicknamesMap);
      setArcMemberCounts(counts);
    } catch (error) {
      console.error("Failed to fetch sets:", error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase, selectedServer]);

  useEffect(() => {
    setSelectedArc(null);
    setNewArcName("");
    setArcs([]);
    setArcNicknamesMap({});
    setArcMemberCounts({});
    loadArcsAndNicknames();
  }, [selectedServer, setSelectedArc, loadArcsAndNicknames]);

  const handleCreateClick = async () => {
    if (newArcName.trim() && members.length > 0) {
      setIsLoading(true);
      try {
        await handleCreateGroup(newArcName.trim(), members);
        await loadArcsAndNicknames();
        setNewArcName("");
      } catch {
        toast("Failed to create group. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast(
        !newArcName.trim()
          ? "Please enter a group name."
          : "Please select members first."
      );
    }
  };

  const handleDeleteArc = async (arcId: number) => {
    setRemovingArcIds((prev) => [...prev, arcId]);
    setTimeout(async () => {
      setArcs((prev) => prev.filter((arc) => arc.id !== arcId));
      setArcNicknamesMap((prev) => {
        const newMap = { ...prev };
        delete newMap[arcId];
        return newMap;
      });
      setArcMemberCounts((prev) => {
        const newCounts = { ...prev };
        delete newCounts[arcId];
        return newCounts;
      });

      if (!supabase || !selectedServer) {
        setRemovingArcIds((prev) => prev.filter((id) => id !== arcId));
        return;
      }

      try {
        await deleteArc(supabase, arcId);
        if (selectedArc?.id === arcId) setSelectedArc(null);
      } catch {
        toast("Failed to delete set. Please try again.");
        await loadArcsAndNicknames();
      } finally {
        setRemovingArcIds((prev) => prev.filter((id) => id !== arcId));
      }
    }, 200);
  };

  return {
    selectedArc,
    arcs,
    newArcName,
    arcNicknamesMap,
    removingArcIds,
    arcMemberCounts,
    isLoading,
    isSavingArc,
    setSelectedArc,
    setNewArcName,
    handleCreateClick,
    handleDeleteArc,
    handleCreateGroup,
  };
};
