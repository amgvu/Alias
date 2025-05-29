import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import ClientProvider from "@/components/ClientProvider";
import "../globals.css";
import Navbar from "@/components/navbar/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gintoNord = localFont({
  src: [
    {
      path: "../../../public/fonts/ABCGintoDiscordNord-Bold.woff2",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../../public/fonts/ABCGintoDiscordNord-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../../public/fonts/ABCGintoDiscordNord-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-gintoNord",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: true,
});

const ginto = localFont({
  src: [
    {
      path: "../../../public/fonts/ABCGintoDiscord-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/ABCGintoDiscord-Medium.woff2",
      weight: "500",
      style: "medium",
    },
  ],
  variable: "--font-ginto",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: true,
});

const ggSans = localFont({
  src: [
    {
      path: "../../../public/fonts/ggsansvf-VF.woff2",
      weight: "400 600",
    },
  ],
  variable: "--font-ggSans",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: true,
});

export const metadata: Metadata = {
  title: "Arclify",
  description: "Streamline Discord Ops with Full-Stack Automation",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gintoNord.variable} ${ginto.variable} ${ggSans.variable} w-full h-full`}
      >
        <ClientProvider>
          <Navbar>{children}</Navbar>
        </ClientProvider>
      </body>
    </html>
  );
}
