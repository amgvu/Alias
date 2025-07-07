import { motion, AnimatePresence } from "framer-motion";
import { Trash2, LoaderCircle, SaveAll } from "lucide-react";
import { Arc, Server, Member, ArcNickname } from "@/types/types";
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VirtualizedNicknameList } from "@/components";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { styles } from "./GroupsPanel.styles";
import { MemberThumbnails } from "./MemberThumbnails";

interface GroupsPanelProps {
  members: Member[];
  selectedServer: Server | null;
  selectedArc: Arc | null;
  newArcName: string;
  arcs: Arc[];
  arcNicknamesMap: Record<number, ArcNickname[]>;
  removingArcIds: number[];
  arcMemberCounts: Record<number, number>;
  isLoading: boolean;
  alertDialog: {
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel?: () => void;
  };
  setNewArcName: (name: string) => void;
  setSelectedArc: (arc: Arc | null) => void;
  setAlertDialog: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      title: string;
      description: string;
      onConfirm: () => void;
      onCancel?: () => void;
    }>
  >;
  handleCreateClick: () => Promise<void>;
  handleDeleteArc: (arcId: number) => Promise<void>;
  handleCreateGroup: (
    groupName: string,
    selectedMembers: Member[]
  ) => Promise<void>;
}

export default function GroupsPanel({
  selectedArc,
  isLoading,
  newArcName,
  arcs,
  arcNicknamesMap,
  removingArcIds,
  arcMemberCounts,
  alertDialog,
  setNewArcName,
  setSelectedArc,
  setAlertDialog,
  handleDeleteArc,
  handleCreateClick,
}: GroupsPanelProps) {
  const [hoveredArc, setHoveredArc] = useState<Arc | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      <MemberThumbnails
        maxVisible={maxVisible}
        visible={visible}
        extra={extra}
      />
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

      <AlertDialog
        open={alertDialog.isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setAlertDialog((prev) => ({ ...prev, isOpen: false }));
            if (alertDialog.onCancel) {
              alertDialog.onCancel();
            }
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="p-2 hover:text-text-primary bg-button ml-2 text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] border border-border enabled:border-border-active rounded-md disabled:bg-transparent disabled:text-text-disabled disabled:cursor-not-allowed cursor-pointer text-text-primary hover:bg-button-hover"
              onClick={() => {
                setAlertDialog((prev) => ({ ...prev, isOpen: false }));
                if (alertDialog.onCancel) {
                  alertDialog.onCancel();
                }
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="p-2 bg-zinc-200 ml-2 text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] border border-border enabled:border-border-active rounded-md disabled:bg-transparent disabled:text-text-disabled disabled:cursor-not-allowed cursor-pointer text-zinc-950 hover:bg-zinc-300"
              onClick={alertDialog.onConfirm}
            >
              Overwrite
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
