import Image from "next/image";

import { Users, UserRoundPen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
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

export function NavigationSidebar({
  activeSection = "server",
  onSectionChange,
  servers,
  selectedServer,
  handleServerSelection,
}: NavigationSidebarProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Sidebar
      className={`
         bg-sidebar border-border
        transition-all z-4 duration-300 mt-[24.5px]  ease-in-out
        ${isMinimized ? "w-[70px]" : ""}
      `}
    >
      <SidebarHeader
        className={`
    py-2 bg-sidebar z-50  border-border
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

      <SidebarContent className="flex flex-col">
        <SidebarGroup>
          {!isMinimized && (
            <SidebarGroupLabel className="text-text-secondary text-xs font-medium tracking-wide">
              App
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
                          ? "text-zinc-600 hover:bg-transparent active:bg-transparent active:text-zinc-600 hover:text-zinc-600 cursor-not-allowed"
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
      </SidebarContent>
    </Sidebar>
  );
}
