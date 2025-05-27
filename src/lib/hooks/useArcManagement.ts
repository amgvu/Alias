import { useState, useEffect } from "react";
import { Arc, ArcNickname, Member } from "@/types/types";
import {
  createArc,
  saveArcNicknames,
  checkExistingArc,
  deleteArcNicknames,
  fetchArcNicknames,
  fetchArcs,
  deleteArc,
} from "@/lib/utils/api";

export const useArcManagement = (
  selectedServer: string,
  members: Member[],
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>
) => {
  const [selectedArc, setSelectedArc] = useState<Arc | null>(null);
  const [isSavingArc, setIsSavingArc] = useState(false);
  const [query, setQuery] = useState("");
  const [arcs, setArcs] = useState<Arc[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const loadArcNicknames = async () => {
      if (selectedArc) {
        try {
          const arcNicknames = await fetchArcNicknames(selectedArc.id);

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
      } else {
        setMembers((prevMembers) =>
          prevMembers.map((member) => ({ ...member, nickname: "" }))
        );
      }
    };

    loadArcNicknames();
  }, [selectedArc, setMembers]);

  const handleSaveArc = async () => {
    if (!selectedServer || !selectedArc || !selectedArc.arc_name) {
      alert("Please select a server, arc, and ensure members are loaded.");
      return;
    }

    setIsSavingArc(true);

    try {
      const existingArc = await checkExistingArc(
        selectedServer,
        selectedArc.arc_name
      );

      if (existingArc) {
        const confirmOverwrite = window.confirm(
          "An arc with this name already exists. Do you want to overwrite it with the new set of nicknames?"
        );

        if (!confirmOverwrite) {
          return;
        }

        await deleteArcNicknames(existingArc.id);
      }

      const arc =
        existingArc || (await createArc(selectedServer, selectedArc.arc_name));

      const newNicknames: ArcNickname[] = members.map((member) => ({
        arc_id: arc.id!,
        guild_id: selectedServer,
        user_id: member.user_id,
        nickname: member.nickname,
        userTag: member.userTag || member.username,
      }));

      await saveArcNicknames(newNicknames);
      alert("Arc saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save arc. Please try again.");
    } finally {
      setIsSavingArc(false);
    }
  };

  const handleCreateNewArc = async (newArcName: string) => {
    try {
      const newArc = await createArc(selectedServer, newArcName);
      setSelectedArc(newArc);
    } catch (error) {
      console.error("Failed to create new arc:", error);
      alert("Failed to create new arc. Please try again.");
    }
  };

  useEffect(() => {
    setQuery("");
    setArcs([]);
  }, [selectedServer]);

  const handleOpen = async () => {
    if (!selectedServer) return;
    setIsLoading(true);
    try {
      const fetchedArcs = await fetchArcs(selectedServer);
      setArcs(fetchedArcs);
    } catch (error) {
      console.error("Failed to fetch sets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteArc = async (
    arcId: number,
    selectedArc: Arc | null,
    setSelectedArc: (arc: Arc | null) => void
  ) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this set? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      await deleteArc(arcId);
      const updatedArcs = await fetchArcs(selectedServer);
      setArcs(updatedArcs);
      if (selectedArc?.id === arcId) {
        setSelectedArc(null);
      }
    } catch (error) {
      console.error("Failed to delete set:", error);
      alert("Failed to delete set. Please try again.");
    }
  };

  const filteredArcs =
    query === ""
      ? arcs
      : arcs.filter(
          (arc) =>
            arc.arc_name &&
            arc.arc_name.toLowerCase().includes(query.toLowerCase())
        );

  const showCreateOption =
    query !== "" &&
    !filteredArcs.some(
      (arc) => arc.arc_name.toLowerCase() === query.toLowerCase()
    );

  return {
    selectedArc,
    setSelectedArc,
    isSavingArc,
    handleSaveArc,
    handleCreateNewArc,
    query,
    setQuery,
    arcs,
    setArcs,
    isLoading,
    isExpanded,
    setIsExpanded,
    handleOpen,
    handleDeleteArc,
    filteredArcs,
    showCreateOption,
  };
};
