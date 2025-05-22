"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  ScrollText,
  LogOut,
  ShieldX,
  Aperture,
  Coffee,
  Mail,
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const handleDiscordLogin = () => {
    signIn("discord", { callbackUrl: "/dashboard" });
  };

  const handleDiscordLogout = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    ...(session
      ? [
          {
            name: "Dashboard",
            href: "/dashboard",
            icon: <Aperture className="h-5 w-5" />,
          },
        ]
      : []),
    {
      name: "Getting Started",
      href: "/getting-started",
      icon: <Coffee className="h-5 w-5" />,
    },
    { name: "Contact", href: "/contact", icon: <Mail className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen">
      <NavigationMenu>
        <NavigationMenuList className="items-center space-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" className="flex items-center gap-2 px-4 py-2">
                <Image src="/Arclify.svg" width="48" height="48" alt="logo" />
                <span className="text-xl font-semibold">Arclify</span>
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
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}

          <NavigationMenuItem>
            {session ? (
              <button
                onClick={handleDiscordLogout}
                className="flex items-center gap-2 px-4 py-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            ) : (
              <button
                onClick={handleDiscordLogin}
                className="flex items-center gap-2 px-4 py-2 text-white bg-[#5865F2] hover:bg-[#454FBF] rounded-lg transition-colors"
              >
                <FaDiscord className="h-5 w-5" />
                <span>Sign In with Discord</span>
              </button>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div>{children}</div>
    </div>
  );
}
