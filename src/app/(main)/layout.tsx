import type { Metadata } from "next";
import { gintoNord, ginto, ggSans } from "@/lib/utilities/fonts";
import ClientProvider from "@/contexts/ClientProvider";
import "../globals.css";
import Navbar from "@/components/ui/navbar/navbar";

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
    <html lang="en">
      <body
        className={`${gintoNord.variable} ${ginto.variable} ${ggSans.variable} w-full h-full`}
      >
        <ClientProvider>
          <Navbar>{children}</Navbar>
        </ClientProvider>
      </body>
    </html>
  );
}
