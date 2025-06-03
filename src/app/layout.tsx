import type { Metadata } from "next";
import { gintoNord, ginto, ggSans } from "@/lib/utilities/fonts";
import "./globals.css";

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
        className={`${gintoNord.variable} ${ginto.variable} ${ggSans.variable} antialiased w-full h-full`}
      >
        {children}
      </body>
    </html>
  );
}
