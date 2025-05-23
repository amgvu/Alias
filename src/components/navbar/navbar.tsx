"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { LogOut, Menu } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const MobileDrawer = ({
  navItems,
}: {
  navItems: { name: string; href: string }[];
}) => {
  return (
    <Drawer>
      <DrawerTrigger className="p-4">
        <Menu className="text-zinc-100 h-6 w-6" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="mb-[-40px]">Menu</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-2 py-2 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose className="px-4 py-2 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md">
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default function Navbar({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const handleDiscordLogin = () => {
    signIn("discord", { callbackUrl: "/dashboard" });
  };

  const handleDiscordLogout = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  const navItems = [
    ...(session
      ? [
          {
            name: "Dashboard",
            href: "/dashboard",
          },
        ]
      : []),
    { name: "Getting Started", href: "/getting-started" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="w-full bg-neutral-950 border-b border-zinc-900 backdrop-blur-lg font-[family-name:var(--font-geist-sans)] fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center md:px-32">
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="hover:bg-background focus:bg-background"
                  >
                    <Link
                      href="/"
                      className="flex flex-row items-center gap-2 px-4 py-4"
                    >
                      <Image
                        src="/Arclify.svg"
                        width="24"
                        height="24"
                        alt="logo"
                        className="inline-block"
                      />
                      <span className="text-xl text-zinc-100 font-semibold whitespace-nowrap">
                        Arclify
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Centered navigation items */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-2">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      asChild
                      className="focus:bg-background focus:text-zinc-400"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  {session ? (
                    <button
                      onClick={handleDiscordLogout}
                      className="flex text-sm items-center gap-2 px-4 py-1 cursor-pointer bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log Out</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleDiscordLogin}
                      className="flex text-sm items-center gap-2 px-4 py-1 cursor-pointer text-zinc-100 bg-[#5865F2] hover:bg-[#454FBF] rounded-md transition-colors"
                    >
                      <FaDiscord className="h-4 w-4" />
                      <span>Sign In</span>
                    </button>
                  )}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="md:hidden">
              <MobileDrawer navItems={navItems} />
            </div>
          </div>
        </div>
      </header>
      <main className="pt-15">{children}</main>
    </>
  );
}
