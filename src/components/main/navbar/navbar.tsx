"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { LogOut, Menu, X } from "lucide-react";
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
import { styles } from "./Navbar.styles";

const MobileDrawer = ({
  productItems,
  resourceItems,
}: {
  productItems: { name: string; href: string }[];
  resourceItems: { name: string; href: string }[];
}) => {
  return (
    <Drawer direction="right">
      <DrawerTrigger className={styles.drawerTrigger}>
        <Menu className={styles.drawerMenuIcon} />
      </DrawerTrigger>
      <DrawerContent className={styles.drawerContent}>
        <div className={styles.drawerContentInner}>
          <DrawerHeader>
            <DrawerTitle className={styles.drawerTitle}>Product</DrawerTitle>
          </DrawerHeader>
          <div className={styles.drawerSection}>
            {productItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={styles.drawerLink}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div>
            <DrawerHeader>
              <DrawerTitle className={styles.drawerTitle}>
                Resources
              </DrawerTitle>
            </DrawerHeader>
            <div className={styles.drawerSection}>
              {resourceItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={styles.drawerLink}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose className={styles.drawerClose}>
            <X className={styles.drawerCloseIcon} />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default function Navbar({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const handleDiscordLogin = () => {
    signIn("discord", { callbackUrl: "/app" });
  };

  const handleDiscordLogout = () => {
    signOut({ callbackUrl: "/", redirect: true });
  };

  const productItems = [
    ...(session
      ? [
          {
            name: "App",
            href: "/app",
          },
        ]
      : []),
    { name: "Features", href: "/features" },
    { name: "Changelog", href: "/changelog" },
  ];

  const resourceItems = [{ name: "Contact", href: "/contact" }];

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
                      <span className={styles.logoText}>Arclify</span>
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
      <main className={styles.main}>{children}</main>
    </>
  );
}
