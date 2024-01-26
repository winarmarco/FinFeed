import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import TrendingBar from "./components/trendingbar";
import Sidebar from "@/components/sidebar/sidebar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {storeId: string};
}) {
  const {userId} = auth();

  if (!userId) redirect("/sign-in");

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex flex-row divide-x max-w-[1280px] w-full mx-auto">
        <Sidebar />
        <main className="flex-1 py-10 px-4 divide-y-2">{children}</main>

        <TrendingBar />
      </div>
    </div>
  );
}
