import type { Metadata } from "next";
import ClientProvider from "@/contexts/ClientProvider";
import "../globals.css";
import Navbar from "@/components/landing/navbar/navbar";

export const metadata: Metadata = {
  title: "Arclify",
  description: "The nickname manager you never knew you wanted",
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
