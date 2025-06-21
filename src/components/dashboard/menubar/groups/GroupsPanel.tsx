import { motion, AnimatePresence } from "framer-motion";
import { Trash2, LoaderCircle, SaveAll } from "lucide-react";
import { Arc, Server, Member, ArcNickname } from "@/types/types";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabase } from "@/contexts/SupabaseProvider";
import { fetchArcs, fetchArcNicknames, deleteArc } from "@/lib/utilities";
import Image from "next/image";
import { VirtualizedNicknameList } from "./VirtualizedNicknameList";

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

  const renderMemberThumbnails = (nicknames: ArcNickname[]) => {
    const maxVisible = 3;
    const visibleNicknames = nicknames.slice(0, maxVisible);
    const remainingCount = nicknames.length - maxVisible;

    return (
      <div className="flex items-center mb-2">
        {visibleNicknames.map((nickname, index) => (
          <div
            key={nickname.user_id}
            className="relative"
            style={{ marginLeft: index > 0 ? "-8px" : "0" }}
          >
            <Image
              src={nickname.avatar_url}
              height={24}
              width={24}
              alt={nickname.user_tag}
              className="rounded-full border-2 border-card-panel bg-card-panel"
            />
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className="w-6 h-6 rounded-full bg-context-bar border-2 border-card-panel flex items-center justify-center text-xs text-text-secondary font-medium"
            style={{ marginLeft: visibleNicknames.length > 0 ? "-8px" : "0" }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="bg-panel border-r translate-x-78 -translate-y-[31.2px] h-screen border-border w-64"
    >
      <div>
        <div className="border-b border-border p-4.5">
          <h1 className="translate-y-1 -translate-x-2">Groups</h1>
        </div>
        <div className="px-2 py-3">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-xs text-text-secondary font-medium">
                Nickname Groups
              </span>
            </div>

            <div className="flex">
              <Input
                placeholder="New group name"
                maxLength={30}
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
                className="cursor-pointer bg-transparent text-text-secondary hover:text-zinc-400 hover:bg-transparent "
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin h-4 w-4" />
                ) : (
                  <SaveAll className="h-4 w-4" />
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
                    const isSelected = selectedArc?.id === arc.id;

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
                            height: "auto",
                            zIndex: isHovered ? 10 : 1,
                          }}
                          transition={{ duration: 0.1, ease: "easeInOut" }}
                          className="relative"
                        >
                          <Card
                            className={`cursor-pointer group overflow-hidden transition-all relative
                              ${
                                isSelected
                                  ? "border-border-subtle ring-1 ring-primary bg-card-panel"
                                  : "border-border hover:border-border-active bg-card-panel hover:bg-opacity-80"
                              }
                              before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 
                              before:bg-gradient-to-r before:from-blue-500 before:via-cyan-500 before:to-cyan-500 
                              before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200
                            `}
                            onClick={() => setSelectedArc(arc)}
                            onMouseEnter={() => handleMouseEnter(arc)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <CardHeader className="p-3 flex flex-row items-start justify-between">
                              <div className="flex-grow min-w-0">
                                {nicknames.length > 0 &&
                                  renderMemberThumbnails(nicknames)}
                                <CardTitle className="text-sm font-medium text-text-primary truncate pr-2">
                                  {arc.arc_name}
                                </CardTitle>
                                {arcMemberCounts[arc.id] !== undefined && (
                                  <p className="text-xs text-text-secondary mt-1">
                                    {arcMemberCounts[arc.id]} members
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 flex-shrink-0">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteArc(arc.id);
                                  }}
                                  className="text-red-400 hover:text-red-500 cursor-pointer hover:bg-button-hover-card transition-all duration-200 p-1 h-6 w-6"
                                  disabled={removingArcIds.includes(arc.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </CardHeader>

                            <AnimatePresence>
                              {isHovered && nicknames.length > 0 && (
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
                                  <div className="p-3 pt-2">
                                    <VirtualizedNicknameList
                                      nicknames={nicknames}
                                    />
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
