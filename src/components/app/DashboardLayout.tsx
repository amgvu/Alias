import { TitleUpdater } from "@/components";
interface DashboardLayoutProps {
  children: React.ReactNode;
  menubar: React.ReactNode;
  authcard: React.ReactNode;
}

export default function DashboardLayout({
  children,
  menubar,
  authcard,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen font-ggSans text-white bg-background">
      <div className="flex">
        <TitleUpdater />
        <div className="flex-shrink-0 fixed z-8">{authcard}</div>
        <div className="flex-shrink-0 z-5">{menubar}</div>
        <div className="flex flex-col flex-1 ml-10">{children}</div>
      </div>
    </div>
  );
}
