import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, X } from "lucide-react";
import { styles } from "./Navbar.styles";
import Link from "next/link";

export default function MobileDrawer({
  productItems,
  resourceItems,
}: {
  productItems: { name: string; href: string }[];
  resourceItems: { name: string; href: string }[];
}) {
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
}
