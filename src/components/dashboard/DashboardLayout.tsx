interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  navigationSidebar: React.ReactNode;
}

export default function DashboardLayout({
  children,
  sidebar,
  navigationSidebar,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen font-ggSans text-white bg-background">
      <div className="flex mt-6">
        <div className="flex-shrink-0 z-5">{navigationSidebar}</div>
        <div className="flex-shrink-0 z-5">{sidebar}</div>
        <div className="flex flex-col flex-1">{children}</div>
      </div>
    </div>
  );
}
