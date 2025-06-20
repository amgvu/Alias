import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  Settings,
  Binoculars,
  Users,
  LogOut,
  HelpCircle,
  UserRoundPen,
  LayoutDashboard,
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

const homeItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    value: "dashboard",
    disabled: true,
  },
];

const userItems = [
  {
    title: "Nicknames",
    icon: UserRoundPen,
    value: "nicknames",
  },
  {
    title: "Roles",
    icon: Users,
    value: "roles",
    disabled: true,
  },
];

const serverItems = [
  {
    title: "Monitoring",
    icon: Binoculars,
    value: "monitoring",
    disabled: true,
  },
];

const settingsItems = [
  {
    title: "Settings",
    icon: Settings,
    value: "settings",
    disabled: true,
  },
  {
    title: "Help",
    icon: HelpCircle,
    value: "help",
    disabled: true,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Sidebar
      className={`
         bg-sidebar border-border
        transition-all duration-300 mt-6  ease-in-out
        ${isMinimized ? "w-[70px]" : ""}
      `}
    >
      <SidebarHeader
        className={`
    py-2 bg-sidebar border-b border- border-border
    flex items-center ${isMinimized ? "justify-center" : "justify-between"} px-4
  `}
      >
        <div className="flex items-center gap-3 flex-1">
          <Image
            src={selectedServer ? selectedServer.iconURL : "/Arclify.svg"}
            width="36"
            height="36"
            alt="logo"
            className="inline-block w-9 h-9 rounded-lg ring-zinc-800"
          />

          {!isMinimized && (
            <h1 className="text-zinc-200 font-medium text-sm truncate max-w-[120px]">
              {selectedServer ? selectedServer.name : "Select a server"}
            </h1>
          )}
        </div>

        {!isMinimized && (
          <div className="flex-shrink-0">
            <DSMenu items={servers} setSelectedItem={handleServerSelection} />
          </div>
        )}
      </SidebarHeader>

      <SidebarGroup>
        {!isMinimized && (
          <SidebarGroupLabel className="text-text-secondary text-xs font-medium tracking-wide">
            App
          </SidebarGroupLabel>
        )}
        <SidebarGroupContent>
          <SidebarMenu>
            {homeItems.map((item) => (
              <SidebarMenuItem key={item.value}>
                <SidebarMenuButton
                  onClick={() =>
                    !item.disabled && onSectionChange?.(item.value)
                  }
                  isActive={activeSection === item.value}
                  className={`
                      text-base font-bold transition-colors duration-200
                      ${isMinimized ? "justify-center" : ""}
                      ${
                        activeSection === item.value
                          ? "text-text-primary hover:bg-button-hover-sidebar"
                          : item.disabled
                          ? "text-zinc-600 hover:bg-transparent hover:text-zinc-600 cursor-not-allowed"
                          : "text-zinc-200 hover:text-zinc-100 hover:bg-zinc-900/50"
                      }
                    `}
                >
                  <item.icon className="text-zinc-500" />
                  {!isMinimized && <span>{item.title}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarContent className="flex flex-col">
        <SidebarGroup>
          {!isMinimized && (
            <SidebarGroupLabel className="text-text-secondary text-xs font-medium tracking-wide">
              Users
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {userItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() =>
                      !item.disabled && onSectionChange?.(item.value)
                    }
                    isActive={activeSection === item.value}
                    className={`
                      text-base font-bold transition-colors duration-200
                      ${isMinimized ? "justify-center" : ""}
                      ${
                        activeSection === item.value
                          ? "text-text-primary hover:bg-button-hover-sidebar"
                          : item.disabled
                          ? "text-zinc-600 hover:bg-transparent hover:text-zinc-600 cursor-not-allowed"
                          : "text-zinc-200 hover:text-zinc-100 hover:bg-zinc-900/50"
                      }
                    `}
                  >
                    <item.icon className="text-zinc-500" />
                    {!isMinimized && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!isMinimized && (
            <SidebarGroupLabel className="text-text-secondary text-xs font-medium tracking-wide">
              Server
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {serverItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() =>
                      !item.disabled && onSectionChange?.(item.value)
                    }
                    isActive={activeSection === item.value}
                    className={`
                      text-base font-bold transition-colors duration-200
                      ${isMinimized ? "justify-center" : ""}
                      ${
                        activeSection === item.value
                          ? "text-text-primary hover:bg-button-hover-sidebar"
                          : item.disabled
                          ? "text-zinc-600 hover:bg-transparent hover:text-zinc-600 cursor-not-allowed"
                          : "text-zinc-200 hover:text-zinc-100 hover:bg-zinc-900/50"
                      }
                    `}
                  >
                    <item.icon className="text-zinc-500" />
                    {!isMinimized && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto">
          <SidebarGroup>
            {!isMinimized && (
              <SidebarGroupLabel className="text-text-secondary text-xs font-medium mb-0.5 tracking-wide">
                More
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => (
                  <SidebarMenuItem key={item.value}>
                    <SidebarMenuButton
                      onClick={() =>
                        !item.disabled && onSectionChange?.(item.value)
                      }
                      isActive={activeSection === item.value}
                      className={`
                      text-base font-bold transition-colors duration-200
                      ${isMinimized ? "justify-center" : ""}
                      ${
                        activeSection === item.value
                          ? "text-text-primary hover:bg-button-hover-sidebar"
                          : item.disabled
                          ? "text-zinc-600 cursor-not-allowed"
                          : "text-zinc-200 hover:text-zinc-100 hover:bg-zinc-900/50"
                      }
                    `}
                    >
                      <item.icon className="text-zinc-500" />
                      {!isMinimized && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>

      {session?.user && (
        <SidebarFooter className="border-t mb-6 border-border p-0">
          <div className="py-3 px-4 bg-sidebar">
            {!isMinimized && (
              <p className="text-text-secondary text-xs font-medium mb-3 tracking-wider">
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
                className="rounded-full ring-2 ring-border-subtle"
              />
              {!isMinimized ? (
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary font-medium text-sm truncate">
                    {session.user.name}
                  </p>
                </div>
              ) : (
                <></>
              )}

              {!isMinimized && (
                <button
                  onClick={handleDiscordLogout}
                  className="flex text-text-primary hover:text-text-primary cursor-pointer hover:bg-button-hover-sidebar rounded-md p-2 transition-colors"
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
