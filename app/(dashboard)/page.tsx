import FeedCard from "@/app/(dashboard)/_components/feed-card/feed-card";
import Sidebar from "@/components/sidebar/sidebar";
import TrendingBar from "./_components/trendingbar";
import { clerkClient } from "@clerk/nextjs";
import { FeedScroll } from "./_components/feed-scroll";

const FeedPage = async () => {
  return (<>
    {/* <Feed posts={posts}/> */}
    <FeedScroll/>
    {/* {posts.map((post) => <FeedCard post={post}/>)} */}
  </>)
}

export default FeedPage;