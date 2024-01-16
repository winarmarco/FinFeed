import FeedCard from "@/components/feed-card";
import Sidebar from "@/components/sidebar/sidebar";
import TrendingBar from "./components/trendingbar";

const FeedPage = () => {
  return <div className="relative flex flex-row divide-x max-w-[1280px] mx-auto">
    <Sidebar />
    <main className="flex-1 py-10 divide-y-2">
      
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      
    </main>

    <TrendingBar />
    
  </div>
}

export default FeedPage;