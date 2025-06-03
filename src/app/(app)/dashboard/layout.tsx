import { Metadata } from "next";
import LayoutHTML from "./layoutHTML";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Arclify dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutHTML>{children}</LayoutHTML>;
}
