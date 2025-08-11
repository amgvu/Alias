export const styles = {
  header:
    "w-full bg-sidebar/50 backdrop-blur-2xl font-ginto font-medium fixed top-0 z-50 mb-16",
  headerContainer:
    "max-w-7xl mx-auto flex justify-between items-center md:px-32",

  logoContainer: "flex items-center gap-4",
  logoLink: "hover:bg-transparent focus:bg-transparent",
  logoLinkInner: "flex flex-row items-center gap-2 px-4 py-4",
  logoImage: "inline-block",
  logoText:
    "text-xl text-text-primary font-gintoNord uppercase tracking-tight whitespace-nowrap",

  desktopNavContainer:
    "hidden md:flex absolute left-1/2 transform -translate-x-1/2",
  navList: "flex gap-2",
  navLink: "focus:bg-sidebar focus:text-text-secondary",
  navLinkInner:
    "flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-transparent-button-hover-sidebar rounded-md",

  authContainer: "flex items-center gap-2",
  logoutButton:
    "flex invisible md:visible text-sm items-center gap-2 px-4 py-1 cursor-pointer bg-button text-text-primary hover:text-text-primary hover:bg-button-hover rounded-md transition-colors",
  signInButton:
    "flex invisible md:visible text-sm items-center gap-2 px-4 py-1 cursor-pointer text-zinc-100 bg-[#5865F2] hover:bg-[#454FBF] rounded-md transition-colors",
  buttonIcon: "h-4 w-4",

  // Mobile drawer
  mobileDrawerContainer: "md:hidden",
  drawerTrigger: "p-4",
  drawerMenuIcon: "text-zinc-100 h-6 w-6",
  drawerContent: "bg-zinc-950/40 font-ginto backdrop-blur-lg",
  drawerContentInner: "p-2",
  drawerTitle: "text-zinc-400 text-md ml-[-8px] font-medium mb-[-40px]",
  drawerSection: "flex mt-4 flex-col",
  drawerLink:
    "px-2 py-0.5 rounded-md font-medium text-2xl text-zinc-100 hover:text-zinc-400",
  drawerClose:
    "px-4 py-2 place-items-center text-zinc-400 hover:text-white cursor-pointer rounded-md",
  drawerCloseIcon: "h-12 w-12",
  main: "bg-red-500",
};
