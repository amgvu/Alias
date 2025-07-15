"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CirclePlus, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ServerBrowserProps } from "@/components/app/SideTopBar/Sidebar.types";

export default function ServerBrowser({
  selectedServer,
  servers,
  handleServerSelection,
}: ServerBrowserProps) {
  return (
    <SidebarContent className="overflow-y-auto">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-2 flex flex-col items-center">
            <AnimatePresence mode="wait">
              {servers.length === 0 ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center h-12 w-12"
                >
                  <Loader2 className="animate-spin w-5 h-5 text-text-secondary" />
                </motion.div>
              ) : (
                <>
                  {servers.map((server) => (
                    <motion.div
                      key={server.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.2,
                      }}
                      layout
                    >
                      <Tooltip>
                        <TooltipContent>
                          <p className="font-ggSans font-bold">{server.name}</p>
                        </TooltipContent>
                        <TooltipTrigger asChild>
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              onClick={() => handleServerSelection(server)}
                              className={`w-14 h-12 flex items-center justify-center rounded-lg transition-all duration-200 ${
                                selectedServer?.id === server.id
                                  ? "bg-button-hover rounded-2xl"
                                  : "hover:bg-transparent-button-hover-context-bar hover:rounded-2xl"
                              }`}
                            >
                              <Image
                                src={server.iconURL}
                                alt={server.name}
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-lg"
                              />
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </TooltipTrigger>
                      </Tooltip>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.2,
                    }}
                    layout
                  >
                    <Tooltip>
                      <TooltipContent>
                        <p className="font-ggSans font-bold">Add a server</p>
                      </TooltipContent>
                      <TooltipTrigger asChild>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            onClick={() =>
                              window.open(
                                "https://discord.com/oauth2/authorize?client_id=1327517966342033441&permissions=1135249446800464&integration_type=0&scope=bot"
                              )
                            }
                            className="w-12 h-12 flex items-center justify-center rounded-lg text-text-secondary hover:bg-transparent-button-hover-context-bar hover:rounded-2xl transition-all duration-200"
                          >
                            <CirclePlus size={32} />
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </TooltipTrigger>
                    </Tooltip>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
