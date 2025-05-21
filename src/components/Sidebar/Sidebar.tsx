"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  ScrollText,
  LogIn,
  LogOut,
  ShieldX,
  Aperture,
  Menu,
  Coffee,
  Mail,
} from "lucide-react";

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
    {
      name: "Privacy Policy",
      href: "/privacy-policy",
      icon: <ShieldX className="h-5 w-5" />,
    },
    {
      name: "Terms Of Service",
      href: "/terms-of-service",
      icon: <ScrollText className="h-5 w-5" />,
    },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen">
        <div className="lg:hidden fixed top-0 left-0 w-full bg-neutral-800 z-10 px-4 py-3">
          <label htmlFor="sidebar-drawer" className="btn btn-square btn-ghost">
            <Menu className="h-5 w-5" />
          </label>
        </div>

        <div>{children}</div>
      </div>

      <div className="drawer-side z-20">
        <label
          htmlFor="sidebar-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu h-full border-r border-neutral-700 w-60 bg-neutral-950 text-neutral-content fixed">
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="sticky inline-flex top-0 p-2 px-4 border-neutral-700">
              <Image src="/Arclify.svg" width="48" height="48" alt="logo" />
              <h2 className="text-xl py-4 px-2 font-semibold">Arclify</h2>
            </div>

            <div className="flex-1 p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sticky text-neutral-400 bottom-0 p-4 border-neutral-700">
              {session ? (
                <button
                  onClick={handleDiscordLogout}
                  className="flex items-center gap-3 px-4 py-2 w-full cursor-pointer transition-all hover:text-white hover:bg-neutral-900 rounded-lg"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  onClick={handleDiscordLogin}
                  className="flex items-center gap-3 px-4 py-2 w-full cursor-pointer transition-all hover:text-white hover:bg-neutral-900 rounded-lg"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
