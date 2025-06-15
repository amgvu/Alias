"use client";
import ClientProvider from "@/contexts/ClientProvider";
import { SupabaseProvider } from "@/contexts/SupabaseProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function LayoutHTML({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <SupabaseProvider>
        <SidebarProvider>
          <main className="bg-zinc-100">{children}</main>
        </SidebarProvider>
      </SupabaseProvider>
    </ClientProvider>
  );
}
