import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, Trash2, LoaderCircle } from "lucide-react";
import { Arc, Server, Member, ArcNickname } from "@/types/types";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabase } from "@/contexts/SupabaseProvider";
import { fetchArcs, fetchArcNicknames, deleteArc } from "@/lib/utilities";

interface GroupsPanelProps {
  members: Member[];
  selectedServer: Server | null;
  selectedArc: Arc | null;
  setSelectedArc: (arc: Arc | null) => void;
  handleCreateGroup: (
    groupName: string,
    selectedMembers: Member[]
  ) => Promise<void>;
}

export default function GroupsPanel({
  members,
  selectedServer,
  selectedArc,
  setSelectedArc,
  handleCreateGroup,
}: GroupsPanelProps) {
  const [newArcName, setNewArcName] = useState("");
  const [arcs, setArcs] = useState<Arc[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [removingArcIds, setRemovingArcIds] = useState<number[]>([]);
  const [arcNicknamesMap, setArcNicknamesMap] = useState<
    Record<number, ArcNickname[]>
  >({});
  const [arcMemberCounts, setArcMemberCounts] = useState<
    Record<number, number>
  >({});
  const [hoveredArc, setHoveredArc] = useState<Arc | null>(null);
  const { supabase } = useSupabase();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
          } catch (error) {
            console.error(
              `Failed to fetch nicknames for arc ${arc.id}:`,
              error
            );
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
      } catch (error) {
        console.error("Error creating group:", error);
        alert("Failed to create group. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else if (!newArcName.trim()) {
      alert("Please enter a group name.");
    } else if (members.length === 0) {
      alert("Please select members first.");
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
        if (selectedArc?.id === arcId) {
          setSelectedArc(null);
        }
      } catch (error) {
        console.error("Failed to delete set:", error);
        alert("Failed to delete set. Please try again.");
        await loadArcsAndNicknames();
      } finally {
        setRemovingArcIds((prev) => prev.filter((id) => id !== arcId));
      }
    }, 200);
  };

  const handleMouseEnter = (arc: Arc) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredArc(arc);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredArc(null);
    }, 150);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="bg-panel border-r h-screen translate-x-14 border-border w-64"
    >
      <div>
        <div className="border-b border-border p-4.5">
          <h1 className="font-">Groups</h1>
        </div>
        <div className="space-y-6 px-4 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Users className="w-4.5 text-text-primary h-4.5" />
              <span className="text-text-primary">Nickname Groups</span>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="New group name"
                value={newArcName}
                onChange={(e) => setNewArcName(e.target.value)}
                className="flex-grow bg-input border border-border text-text-primary focus:ring-1 focus:ring-border-active"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newArcName.trim()) {
                    handleCreateClick();
                  }
                }}
                disabled={isLoading}
              />
              <Button
                onClick={handleCreateClick}
                disabled={!newArcName.trim() || isLoading}
                className="cursor-pointer bg-transparent text-zinc-500 hover:text-zinc-400 hover:bg-transparent "
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="grid gap-2 max-h-screen overflow-y-auto pr-2">
              {isLoading && arcs.length === 0 ? (
                <div className="relative cursor-default select-none py-2 text-neutral-400 flex items-center gap-2">
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Loading groups...
                </div>
              ) : arcs.length === 0 ? (
                <Card className="border-dashed border-border p-4 text-center text-text-secondary bg-transparent shadow-none">
                  No groups found. Select users and create one!
                </Card>
              ) : (
                <AnimatePresence mode="popLayout">
                  {arcs.map((arc) => {
                    const isHovered = hoveredArc?.id === arc.id;
                    const nicknames = arcNicknamesMap[arc.id] || [];

                    return (
                      <motion.div
                        key={arc.id}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{
                          opacity: removingArcIds.includes(arc.id) ? 0 : 1,
                          y: 0,
                        }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          animate={{
                            height:
                              isHovered && nicknames.length > 0
                                ? "auto"
                                : "auto",
                            zIndex: isHovered ? 10 : 1,
                          }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="relative"
                        >
                          <Card
                            className={`cursor-pointer bg-card-panel group overflow-hidden ${
                              selectedArc?.id === arc.id
                                ? "border-border-subtle ring-1 ring-primary"
                                : "border-border hover:border-border-active"
                            } transition-all relative`}
                            onClick={() => setSelectedArc(arc)}
                            onMouseEnter={() => handleMouseEnter(arc)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <CardHeader className="p-2 flex flex-row items-center justify-between">
                              <CardTitle className="text-sm font-medium text-text-primary flex-grow truncate pr-2">
                                {arc.arc_name}
                                {arcMemberCounts[arc.id] !== undefined && (
                                  <p className="text-xs text-text-secondary">
                                    {arcMemberCounts[arc.id]} members
                                  </p>
                                )}
                              </CardTitle>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteArc(arc.id);
                                }}
                                className="text-red-400 hover:text-red-500 cursor-pointer hover:bg-button-hover-card transition-all duration-200 p-1 h-fit"
                                disabled={removingArcIds.includes(arc.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </CardHeader>

                            <AnimatePresence>
                              {isHovered && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.2,
                                    ease: "easeInOut",
                                  }}
                                  className="overflow-hidden border-t border-border"
                                >
                                  <div className="p-2">
                                    {nicknames.length === 0 ? (
                                      <p className="text-xs text-text-secondary">
                                        No nicknames found for this group.
                                      </p>
                                    ) : (
                                      <div className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                                        <ul className="space-y-0.5">
                                          {nicknames.map((nickname, index) => (
                                            <motion.li
                                              key={nickname.user_id}
                                              initial={{ opacity: 0, y: -5 }}
                                              animate={{ opacity: 1, y: 0 }}
                                              transition={{
                                                duration: 0.15,
                                                delay: index * 0.02,
                                              }}
                                              className="text-xs bg-context-bar p-1 rounded"
                                            >
                                              <span className="text-text-primary">
                                                {nickname.user_id}
                                              </span>
                                              <div className="text-text-primary font-medium">
                                                {nickname.userTag}
                                              </div>
                                              <div className="text-text-secondary truncate">
                                                {nickname.nickname}
                                              </div>
                                            </motion.li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Card>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
