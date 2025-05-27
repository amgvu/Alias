"use client";
import ClientProvider from "@/components/ClientProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <ClientProvider>
        <main>{children}</main>
      </ClientProvider>
    </div>
  );
}
