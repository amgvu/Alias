import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Settings, Binoculars, Landmark, Users, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import DSMenu from "@/components/ui/Menu/Menu";
import { Server } from "@/types/types";

import { useState } from "react";

interface NavigationSidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  servers: Server[];
  selectedServer: Server | null;
  handleServerSelection: (server: Server) => void;
}

const navigationItems = [
  {
    title: "Nicknames",
    icon: Users,
    value: "nicknames",
  },
  {
    title: "Roles",
    icon: Landmark,
    value: "roles",
  },
  {
    title: "Monitoring",
    icon: Binoculars,
    value: "monitoring",
  },
  {
    title: "Utilities",
    icon: Settings,
    value: "utilities",
  },
];

export function NavigationSidebar({
  activeSection = "server",
  onSectionChange,
  servers,
  selectedServer,
  handleServerSelection,
}: NavigationSidebarProps) {
  const { data: session } = useSession();
  const [isMinimized, setIsMinimized] = useState(false);

  const handleDiscordLogout = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Sidebar
      className={`
        bg-zinc-950 border-r border-[#252525]
        transition-all duration-300 ease-in-out
        ${isMinimized ? "w-[70px]" : ""}
      `}
    >
      <SidebarHeader
        className={`
    py-3 bg-zinc-900/20 border-b border-[#252525]
    flex items-center
    ${isMinimized ? "justify-center" : "justify-between px-4"}
  `}
      >
        <div className="flex items-center">
          <h1 className="mt-1 flex items-center">
            <button className="cursor-pointer" onClick={toggleMinimize}>
              <Image
                src={selectedServer ? selectedServer.iconURL : "/Arclify.svg"}
                width="36"
                height="36"
                alt="logo"
                className={`inline-block w-10 rounded-lg ring-zinc-800 ${
                  isMinimized ? "h-10 w-10" : "h-10 w-18"
                }`}
              />
            </button>
          </h1>
          {!isMinimized && (
            <DSMenu items={servers} setSelectedItem={handleServerSelection} />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          {!isMinimized && (
            <SidebarGroupLabel className="text-zinc-500 text-xs font-medium mb-2 tracking-wide uppercase">
              Workspace
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange?.(item.value)}
                    isActive={activeSection === item.value}
                    className={`
                      text-lg font-medium transition-colors duration-200
                      ${isMinimized ? "justify-center" : ""}
                      ${
                        activeSection === item.value
                          ? "text-zinc-100 bg-zinc-800/50 hover:bg-zinc-800"
                          : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50"
                      }
                    `}
                  >
                    <item.icon className="w-4.5 h-4.5" />
                    {!isMinimized && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {session?.user && (
        <SidebarFooter className="border-t border-[#252525] p-0">
          <div className="py-3 px-4 bg-zinc-900/20">
            {!isMinimized && (
              <p className="text-zinc-400 text-xs font-medium mb-3 tracking-wider">
                Signed in as:
              </p>
            )}
            <div
              className={`flex items-center gap-3 ${
                isMinimized ? "justify-center" : ""
              }`}
            >
              <Image
                src={session.user.image || "/default-avatar.png"}
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full ring-2 ring-zinc-800"
              />
              {!isMinimized ? (
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-200 font-medium text-sm truncate">
                    {session.user.name}
                  </p>
                </div>
              ) : (
                <></>
              )}

              {!isMinimized && (
                <button
                  onClick={handleDiscordLogout}
                  className="flex text-zinc-400 hover:text-white cursor-pointer hover:bg-zinc-900 rounded-md p-2 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
