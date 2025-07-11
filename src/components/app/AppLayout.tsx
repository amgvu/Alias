import TitleUpdater from "./utils/TitleUpdater";
import { Toaster } from "../ui/sonner";

import { AppLayoutProps } from "@/components/app/AppLayout.types";

export default function AppLayout({
  sidebar,
  topbar,
  authcard,
  servercontent,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen font-ggSans text-white bg-background">
      <div className="flex">
        <TitleUpdater />
        <Toaster />
        <div className="flex-shrink-0 fixed z-8">{authcard}</div>
        <div className="flex-shrink-0 z-5">{sidebar}</div>
        <div>{topbar}</div>
        <div className="flex flex-col flex-1 ml-10">{servercontent}</div>
      </div>
    </div>
  );
}
