"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const handleDiscordLogin = () => {
    signIn("discord", { callbackUrl: "/dashboard" });
  };

  const handleDiscordLogout = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  const navItems = [
    { name: "Home", href: "/" },
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
      <header className="w-full bg-neutral-950 border-b font-[family-name:var(--font-geist-sans)] border-neutral-900 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center justify-center space-x-4">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="flex flex-row hover:bg-neutral-950 items-center gap-2 px-4 py-4"
                  >
                    <Image
                      src="/Arclify.svg"
                      width="24"
                      height="24"
                      alt="logo"
                      className="inline-block"
                    />
                    <span className="text-xl text-neutral-100 font-semibold whitespace-nowrap">
                      Arclify
                    </span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                {session ? (
                  <button
                    onClick={handleDiscordLogout}
                    className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </button>
                ) : (
                  <button
                    onClick={handleDiscordLogin}
                    className="flex items-center gap-2 px-4 py-2 cursor-pointer text-white bg-[#5865F2] hover:bg-[#454FBF] rounded-lg transition-colors"
                  >
                    <FaDiscord className="h-4 w-4" />
                    <span>Sign In with Discord</span>
                  </button>
                )}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
      <main className="pt-20">{children}</main>
    </>
  );
}
