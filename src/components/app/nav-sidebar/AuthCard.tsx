import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { LogOut, Settings, HelpCircle } from "lucide-react";
import { SidebarFooter } from "@/components/ui/sidebar";

export default function AuthCard() {
  const { data: session } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMinimized, setIsMinimized] = useState(false);

  const handleDiscordLogout = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

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

  return (
    <div className="fixed bottom-1 left-1 z-50">
      {session?.user && (
        <SidebarFooter className="">
          <div className="py-2.5 px-4 w-89 border border-border rounded-lg bg-card">
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
                className="rounded-full ring-2 h-9 w-9 ring-border-subtle"
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
                <div className="flex items-center gap-1">
                  {settingsItems.map((item) => (
                    <button
                      key={item.value}
                      // onClick={() => !item.disabled && onSectionChange?.(item.value)}
                      className={`
                        flex text-text-secondary hover:text-text-primary
                        hover:bg-button-hover-sidebar rounded-md p-2 transition-colors
                        ${
                          item.disabled
                            ? "text-zinc-600 hover:bg-transparent hover:text-zinc-600 cursor-not-allowed"
                            : ""
                        }
                      `}
                      title={item.title}
                      disabled={item.disabled}
                    >
                      <item.icon className="h-5 w-5" />
                    </button>
                  ))}
                  <button
                    onClick={handleDiscordLogout}
                    className="flex text-text-secondary hover:text-text-primary cursor-pointer hover:bg-transparent-button-hover-sidebar rounded-md p-2 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </SidebarFooter>
      )}
    </div>
  );
}
