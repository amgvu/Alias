import { UserRoundPen, Users } from "lucide-react";

export const sidebarItems = [
  {
    title: "Nicknames",
    icon: UserRoundPen,
    value: "nicknames",
  },
  {
    title: "Roles",
    icon: Users,
    value: "roles",
    disabled: true,
  },
];
