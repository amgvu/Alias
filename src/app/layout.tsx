import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
      path: "../../public/fonts/ABCGintoDiscordNord-Bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-ginto-nord",
  display: "swap",
  adjustFontFallback: "Arial",
});

const gintoMedium = localFont({
  src: [
    {
      path: "../../public/fonts/ABCGintoDiscord-Medium.woff2",
      weight: "400",
      style: "medium",
    },
  ],
  variable: "--font-ginto-medium",
  display: "swap",
  adjustFontFallback: "Arial",
});

const gintoRegular = localFont({
  src: [
    {
      path: "../../public/fonts/ABCGintoDiscord-Regular.woff2",
      weight: "400",
      style: "medium",
    },
  ],
  variable: "--font-ginto-regular",
  display: "swap",
  adjustFontFallback: "Arial",
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
        className={`${geistSans.variable} ${geistMono.variable} ${gintoNord.variable} ${gintoMedium.variable} ${gintoRegular.variable} w-full h-full`}
      >
        {children}
      </body>
    </html>
  );
}
