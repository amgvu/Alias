"use client";
import { toolsItems } from "@/lib/data/tools-items";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ToolBrowserProps } from "@/components/app/SideTopBar/Sidebar.types";

export default function ToolBrowser({
  activeTool,
  setActiveTool,
}: ToolBrowserProps) {
  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId);
  };
  return (
    <SidebarHeader className="bg-sidebar z-50 border-border flex items-center justify-center px-2.5">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-2 border-b border-border pb-3 flex flex-col items-center">
            {toolsItems.map((tool) => {
              const IconComponent = tool.icon;
              const isActive = activeTool === tool.id;
              return (
                <Tooltip key={tool.id}>
                  <TooltipContent>
                    <p className="font-ggSans font-bold">{tool.id}</p>
                  </TooltipContent>
                  <TooltipTrigger asChild>
                    <SidebarMenuItem key={tool.id}>
                      <SidebarMenuButton
                        onClick={() => handleToolClick(tool.id)}
                        className={`text-sm z-8 sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] 2xl:text-[17px] w-12 h-12 flex items-center justify-center rounded-lg transition-colors duration-200 ${
                          isActive
                            ? "bg-button-hover text-text-primary"
                            : "text-text-secondary hover:bg-transparent-button-hover-context-bar"
                        }`}
                      >
                        <IconComponent
                          size={20}
                          className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6"
                        />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </TooltipTrigger>
                </Tooltip>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarHeader>
  );
}
