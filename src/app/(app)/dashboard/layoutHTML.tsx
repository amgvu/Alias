"use client";
import ClientProvider from "@/contexts/ClientProvider";
import { SupabaseProvider } from "@/contexts/SupabaseProvider";

export default function LayoutHTML({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <SupabaseProvider>
        <main>{children}</main>
      </SupabaseProvider>
    </ClientProvider>
  );
}
