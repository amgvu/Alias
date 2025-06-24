import type { Metadata } from "next";
import ClientProvider from "@/contexts/ClientProvider";
import "../globals.css";
import Navbar from "@/components/main/navbar/navbar";

export const metadata: Metadata = {
  title: "Arclify",
  description: "Automating the busywork of Discord community management",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProvider>
      <Navbar>{children}</Navbar>
    </ClientProvider>
  );
}
