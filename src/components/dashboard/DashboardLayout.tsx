interface DashboardLayoutProps {
  children: React.ReactNode;
  menubar: React.ReactNode;
  navigationSidebar: React.ReactNode;
  authbar: React.ReactNode;
}

export default function DashboardLayout({
  children,
  menubar,
  navigationSidebar,
  authbar,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen font-ggSans text-white bg-background">
      <div className="flex mt-6">
        <div className="flex-shrink-0 z-5">{navigationSidebar}</div>
        <div className="flex-shrink-0 fixed z-6">{authbar}</div>
        <div className="flex-shrink-0 z-5">{menubar}</div>
        <div className="flex flex-col flex-1">{children}</div>
      </div>
    </div>
  );
}
