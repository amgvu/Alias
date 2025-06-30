import { motion, AnimatePresence } from "framer-motion";
import { Trash2, LoaderCircle, SaveAll } from "lucide-react";
import { Arc, Server, Member, ArcNickname } from "@/types/types";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VirtualizedNicknameList } from "@/components";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabase } from "@/contexts/SupabaseProvider";
import { fetchArcs, fetchArcNicknames, deleteArc } from "@/lib/utilities";
import Image from "next/image";
import { styles } from "./GroupsPanel.styles";

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
        alert("Failed to create group. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert(
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
        alert("Failed to delete set. Please try again.");
        await loadArcsAndNicknames();
      } finally {
        setRemovingArcIds((prev) => prev.filter((id) => id !== arcId));
      }
    }, 200);
  };

  const handleMouseEnter = (arc: Arc) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredArc(arc);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setHoveredArc(null), 150);
  };

  const renderMemberThumbnails = (nicknames: ArcNickname[]) => {
    const maxVisible = 3;
    const visible = nicknames.slice(0, maxVisible);
    const extra = nicknames.length - maxVisible;

    return (
      <div className={styles.memberThumbnailsWrapper}>
        {visible.map((n, idx) => (
          <div
            key={n.user_id}
            className="relative"
            style={{ marginLeft: idx > 0 ? "-8px" : "0" }}
          >
            <Image
              src={n.avatar_url}
              height={24}
              width={24}
              alt={n.user_tag}
              className="rounded-full border-2 border-card-panel bg-card-panel"
            />
          </div>
        ))}
        {extra > 0 && (
          <div
            className={styles.extraMemberCount}
            style={{ marginLeft: visible.length > 0 ? "-8px" : "0" }}
          >
            +{extra}
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
      className={styles.panelContainer}
    >
      <div>
        <div className={styles.headingWrapper}>
          <h1 className={styles.heading}>Groups</h1>
        </div>

        <div className={styles.sectionWrapper}>
          <div className={styles.sectionSpacing}>
            <div className="flex items-center gap-4">
              <span className={styles.sectionLabel}>Nickname Groups</span>
            </div>

            <div className="flex">
              <Input
                className={styles.input}
                placeholder="New group name"
                maxLength={30}
                value={newArcName}
                onChange={(e) => setNewArcName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateClick()}
                disabled={isLoading}
              />
              <Button
                onClick={handleCreateClick}
                disabled={!newArcName.trim() || isLoading}
                className={styles.inputButton}
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin h-4 w-4" />
                ) : (
                  <SaveAll className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className={styles.listWrapper}>
              {isLoading && arcs.length === 0 ? (
                <div className={styles.loadingState}>
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Loading groups...
                </div>
              ) : arcs.length === 0 ? (
                <Card className={styles.emptyState}>
                  No groups found. Select users and create one!
                </Card>
              ) : (
                <AnimatePresence mode="popLayout">
                  {arcs.map((arc) => {
                    const isHovered = hoveredArc?.id === arc.id;
                    const isSelected = selectedArc?.id === arc.id;
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
                            height: "auto",
                            zIndex: isHovered ? 10 : 1,
                          }}
                          transition={{ duration: 0.1, ease: "easeInOut" }}
                          className="relative"
                        >
                          <Card
                            className={`${styles.groupCard} ${
                              isSelected
                                ? styles.groupCardSelected
                                : styles.groupCardDefault
                            }`}
                            onClick={() => setSelectedArc(arc)}
                            onMouseEnter={() => handleMouseEnter(arc)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <CardHeader className={styles.cardHeader}>
                              <div className="flex-grow min-w-0">
                                {nicknames.length > 0 &&
                                  renderMemberThumbnails(nicknames)}
                                <CardTitle className={styles.cardTitle}>
                                  {arc.arc_name}
                                </CardTitle>
                                {arcMemberCounts[arc.id] !== undefined && (
                                  <p className={styles.cardSubtitle}>
                                    {arcMemberCounts[arc.id]} members
                                  </p>
                                )}
                              </div>
                              <div className={styles.groupActions}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteArc(arc.id);
                                  }}
                                  className={styles.deleteButton}
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
                                  className={styles.virtualizedListWrapper}
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
