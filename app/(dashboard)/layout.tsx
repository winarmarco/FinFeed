import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import TrendingBar from "./_components/trendingbar";
import Sidebar from "@/components/sidebar/sidebar";
import { api } from "@/_trpc/server";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex flex-row divide-x max-w-[1280px] w-full mx-auto">
        <Sidebar />
        <main className="py-10 flex-1 divide-y-2 ">
          {children}
        </main>

        <TrendingBar />
      </div>
    </div>
  );
}
