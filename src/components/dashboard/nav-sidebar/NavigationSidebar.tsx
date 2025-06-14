import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  Settings,
  Binoculars,
  Landmark,
  Server,
  Users,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
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
import { Button } from "@/components/ui/button";

import { useState } from "react";

interface NavigationSidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const navigationItems = [
  {
    title: "Server",
    icon: Server,
    value: "server",
  },
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
          py-4 bg-zinc-900/20 border-b border-[#252525]
          flex items-center
          ${isMinimized ? "justify-center" : "justify-between px-4"}
        `}
      >
        <div className="flex items-center">
          <h1 className="space-x-2 mt-1 flex items-center">
            <Image
              src="/Arclify.svg"
              width="30"
              height="30"
              alt="logo"
              className="inline-block -translate-y-1"
            />
            {!isMinimized && (
              <span className="text-zinc-200 text-xl font-gintoNord whitespace-nowrap">
                Arclify
              </span>
            )}
          </h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMinimize}
          className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
        >
          {isMinimized ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          {!isMinimized && (
            <SidebarGroupLabel className="text-zinc-500 text-xs font-medium mb-2 tracking-wider uppercase">
              Navigation
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
              {!isMinimized ? (
                <button
                  onClick={handleDiscordLogout}
                  className="flex invisible md:visible text-sm items-center gap-2 px-4 py-1 cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-colors"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              ) : (
                <button
                  onClick={handleDiscordLogout}
                  className="flex text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md p-2 transition-colors"
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
