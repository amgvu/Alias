import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function DashboardLayout({
  children,
  sidebar,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen font-ggSans text-white bg-background">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">{children}</div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {sidebar}
        </div>
      </div>
    </div>
  );
}
