"use client";
import { gintoNord, ginto, ggSans } from "@/lib/utilities/fonts";
import ClientProvider from "@/contexts/ClientProvider";

export default function LayoutHTML({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <body
        className={`${gintoNord.variable} ${ginto.variable} ${ggSans.variable} antialiased min-h-screen w-full h-full`}
      >
        <main>{children}</main>
      </body>
    </ClientProvider>
  );
}
