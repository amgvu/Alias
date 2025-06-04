import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { GET as authOptions } from "@/app/api/auth/[...nextauth]/route";
import LayoutHTML from "./layoutHTML";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const username = session?.user.id || "Dashboard";
  return {
    title: `${username} | Dashboard`,
    description: `Arclify dashboard for ${username}`,
  };
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutHTML>{children}</LayoutHTML>;
}
