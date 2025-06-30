import { Session } from "next-auth";

export function getProductItems(session: Session | null) {
  return [
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
}

export const resourceItems = [{ name: "Contact", href: "/contact" }];
