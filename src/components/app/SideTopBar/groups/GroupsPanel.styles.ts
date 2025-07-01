export const styles = {
  panelContainer:
    "bg-panel border-r translate-x-[82px] translate-y-2 border-l border-t rounded-l-lg h-screen border-border w-74",

  headingWrapper: "p-3.5",
  heading:
    "translate-y-1 font-medium text-text-primary -translate-x-0.5 text-base sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px]",

  sectionWrapper: "px-3 py-1",
  sectionSpacing: "space-y-2",
  sectionLabel:
    "text-xs sm:text-xs md:text-sm lg:text-sm xl:text-[13px] 2xl:text-[14px] text-text-secondary font-medium",

  input:
    "text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] flex-grow bg-input border border-border text-text-primary focus:ring-1 focus:ring-border-active",
  inputButton:
    "cursor-pointer bg-transparent text-text-secondary hover:text-zinc-400 hover:bg-transparent",
  listWrapper: "grid gap-2 max-h-screen overflow-y-auto pr-2",
  emptyState:
    "border-dashed border-border p-4 text-center text-text-secondary bg-transparent shadow-none",
  loadingState:
    "relative cursor-default select-none py-2 text-neutral-400 flex items-center gap-2",

  groupCard:
    "cursor-pointer group overflow-hidden transition-all relative before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-400 before:via-blue-500 before:to-blue-400 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200",
  groupCardSelected: "border-border-subtle ring-1 ring-primary bg-card-panel",
  groupCardDefault:
    "border-border hover:border-border-active bg-card-panel hover:bg-opacity-80",

  cardHeader: "p-3 flex flex-row items-start justify-between",
  cardTitle:
    "text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] font-medium text-text-primary truncate pr-2",
  cardSubtitle:
    "text-xs sm:text-sm md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] text-text-secondary mt-1",

  deleteButton:
    "text-red-400 hover:text-red-500 cursor-pointer hover:bg-zinc-900/50 transition-all duration-200 p-1 h-6 w-6",
  memberThumbnailsWrapper: "flex items-center mb-2",
  extraMemberCount:
    "w-6 h-6 rounded-full bg-context-bar border-2 border-card-panel flex items-center justify-center text-[10px] sm:text-xs md:text-xs lg:text-sm text-text-secondary font-medium",
  groupActions:
    "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2 flex-shrink-0",
  virtualizedListWrapper: "overflow-hidden border-t border-border",
};
