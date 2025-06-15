interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function DashboardLayout({
  children,
  sidebar,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen font-ggSans text-white bg-background">
      <div className="flex mt-6">
        <div className="flex-shrink-0">{sidebar}</div>
        <div className="flex flex-col flex-1">{children}</div>
      </div>
    </div>
  );
}
