import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { gintoNord, ginto, ggSans } from "@/lib/utilities/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alias",
  description: "The nickname manager you never knew you wanted",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
