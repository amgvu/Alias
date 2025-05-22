import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientProvider from "@/components/ClientProvider";
import "./globals.css";
import Sidebar from "@/components/navbar/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arclify",
  description: "Streamline Discord Ops with Full-Stack Automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-full h-full bg-black`}
      >
        <ClientProvider>
          <Sidebar>{children}</Sidebar>
        </ClientProvider>
      </body>
    </html>
  );
}
