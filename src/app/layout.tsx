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

const ggSansRegular = localFont({
  src: [
    {
      path: "../../public/fonts/ggsans-Normal.woff2",
      weight: "400",
      style: "medium",
    },
  ],
  variable: "--font-ggsans-regular",
  display: "swap",
  adjustFontFallback: "Arial",
});

const ggSansMedium = localFont({
  src: [
    {
      path: "../../public/fonts/ggsans-Medium.woff2",
      weight: "400",
      style: "medium",
    },
  ],
  variable: "--font-ggsans-medium",
  display: "swap",
  adjustFontFallback: "Arial",
});

const ggSansSemiBold = localFont({
  src: [
    {
      path: "../../public/fonts/ggsans-SemiBold.woff2",
      weight: "400",
      style: "medium",
    },
  ],
  variable: "--font-ggsans-semi-bold",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  title: "Arclify",
  description: "Automating the busywork of Discord community management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gintoNord.variable} ${gintoMedium.variable} ${gintoRegular.variable} ${ggSansRegular.variable} ${ggSansSemiBold.variable} ${ggSansMedium.variable} w-full h-full`}
      >
        {children}
      </body>
    </html>
  );
}
