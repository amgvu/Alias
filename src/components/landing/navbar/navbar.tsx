"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { useAuth } from "@/lib/hooks";
import { getProductItems, resourceItems } from "@/lib/data";
import MobileDrawer from "./mobile-drawer";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { styles } from "./Navbar.styles";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const { handleDiscordLogout, handleDiscordLogin } = useAuth();
  const productItems = getProductItems(session);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={styles.logoLink}>
                    <Link href="/" className={styles.logoLinkInner}>
                      <Image
                        src="/Arclify.svg"
                        width="26"
                        height="26"
                        alt="logo"
                        className={styles.logoImage}
                      />
                      <span className={styles.logoText}>ALIAS</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className={styles.desktopNavContainer}>
            <NavigationMenu>
              <NavigationMenuList className={styles.navList}>
                {[...productItems, ...resourceItems].map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink asChild className={styles.navLink}>
                      <Link href={item.href} className={styles.navLinkInner}>
                        <span>{item.name}</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className={styles.authContainer}>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  {session ? (
                    <button
                      onClick={handleDiscordLogout}
                      className={styles.logoutButton}
                    >
                      <LogOut className={styles.buttonIcon} />
                      <span>Log Out</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleDiscordLogin}
                      className={styles.signInButton}
                    >
                      <FaDiscord className={styles.buttonIcon} />
                      <span>Sign In</span>
                    </button>
                  )}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className={styles.mobileDrawerContainer}>
              <MobileDrawer
                productItems={productItems}
                resourceItems={resourceItems}
              />
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
