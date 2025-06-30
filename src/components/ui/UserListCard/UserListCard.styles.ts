export const styles = {
  card: "w-full place-items-center-left bg-card border border-[#1f1f23] px-4 py-1 rounded-md duration-200 transition-all relative bg-no-repeat bg-left",

  avatar: "w-11 h-11 ring-2 ring-zinc-800 rounded-full object-cover",

  dragOverlay: {
    container:
      "bg-zinc-900/10 backdrop-blur-lg w-128 -translate-x-64 rounded-lg shadow-xl border-2 border-dashed border-blue-400 text-left flex flex-col justify-center h-12",
    text: "text-lg sm:text-base md:text-lg lg:text-[18px] xl:text-[19px] 2xl:text-[20px] ml-2 text-center font-semibold text-white mb-1 flex items-center justify-center",
    icon: "inline-block mt-0.5 text-blue-400 mr-2",
  },

  dropTarget: {
    ring: "ring-2 ring-blue-400 ring-opacity-50 bg-blue-50/10",
    overlay:
      "absolute inset-0 bg-blue-400/20 border-2 border-blue-400 border-dashed rounded-lg z-10 flex items-center justify-center",
  },

  dragSource: "opacity-50",

  loadingOverlay: {
    container:
      "absolute inset-0 z-20 flex items-center justify-center rounded-lg",
    spinner: "animate-spin w-10 h-10 text-white",
  },

  backgroundOverlay: "absolute inset-0",

  mainContent: "flex items-center space-x-2 relative z-10",

  avatarContainer: "h-full flex-shrink-0 relative",

  memberDetails: "flex-1",

  inputSection: {
    container: "w-full text-lg flex flex-col justify-center",
    inputWrapper: "relative flex items-center group",
    input:
      "w-full max-w-128 hover:bg-zinc-800 border border-border bg-card-input transition-all duration-200 font-bold rounded-md focus:outline-hidden focus:ring-1 focus:ring-border-subtle text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px]",
    dragHandle:
      "right-0 duration-200 top-1/2 transform mr-2 p-1.5 text-zinc-700 hover:text-zinc-500 cursor-grab active:cursor-grabbing group-hover:opacity-100 transition-all flex items-center justify-center rounded",
    dragIcon: "w-4 h-4",
  },

  username:
    "text-sm font-regular text-zinc-500 pl-2 sm:text-sm md:text-base lg:text-[14px] xl:text-[15px] 2xl:text-[16px] font-normal",

  nicknameInput:
    "w-full max-w-128 hover:bg-zinc-800 border border-border bg-card-input transition-all duration-200 font-bold rounded-md focus:outline-hidden focus:ring-1 focus:ring-border-subtle",

  buttonSection: {
    container: "flex flex-row space-x-2",
    loaderContainer: "flex items-center justify-center w-[90px] h-[36px]",
    loader: "animate-spin w-5 h-5 text-zinc-100",
    buttonWrapper: "inline-block",
    resetContainer: "relative inline-block",
    resetSuccess:
      "absolute inset-0 flex items-center justify-center pointer-events-none",
    buttonIcon: "w-4 h-4 mr-[-2px]",
    successIcon: "w-5 h-5 text-zinc-100",
  },

  applyButton:
    "bg-button font-bold hover:bg-zinc-700 border border-border-active text-sm text-zinc-100 transition-all sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] cursor-pointer text-text-primary hover:bg-button-hover duration-200 disabled:bg-disabled-button disabled:text-text-disabled flex items-center justify-center",

  resetButton:
    "text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] bg-button cursor-pointer text-text-primary hover:bg-button-hover transition-all duration-200 disabled:bg-disabled-button disabled:text-text-disabled border border-border-active flex items-center justify-center",

  expandButton:
    "p-2 transition-all text-zinc-700 hover:text-zinc-500 cursor-pointer rounded-lg",
  expandIcon: "w-5 h-5 transition-all duration-200",

  expandedSection: {
    container:
      "absolute inset-0 bg-sidebar/80 backdrop-blur-sm rounded-lg z-10 flex flex-col",
    content: "px-2 flex-1",
    closeButton:
      "p-2 right-3.5 top-3 fixed transition-all cursor-pointer rounded-lg",
    closeIcon:
      "w-5 h-5 text-zinc-700 hover:text-zinc-500 transition-all duration-200",
    title:
      "text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] flex items-center gap-2 font-bold text-zinc-300",
    loadingText:
      "flex text-xs sm:text-sm md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] items-center gap-2 text-zinc-400",
    loadingIcon: "animate-spin w-4 h-4",
    errorText: "text-red-500",
    emptyText:
      "text-zinc-500 text-xs sm:text-sm md:text-sm lg:text-[13px] xl:text-[14px] 2xl:text-[15px] italic",
    nicknamesContainer: "overflow-x-auto",
    nicknamesList: "flex gap-2 pb-2 min-w-max",
    nicknameItem: "relative flex-shrink-0 mt-1",
    nicknameButton:
      "px-3 py-0.5 text-sm sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] font-medium bg-sidebar border-border-subtle border cursor-pointer transition-all hover:bg-card rounded-md whitespace-nowrap",
    deleteButton:
      "text-[10px] sm:text-xs md:text-sm absolute -top-1 -right-1 p-1 cursor-pointer text-sm text-white bg-red-400 rounded-full transition hover:bg-red-500",
    deleteIcon: "w-3 h-3",
  },
};
