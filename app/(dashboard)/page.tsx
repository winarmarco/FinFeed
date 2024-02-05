import FeedCard from "@/app/(dashboard)/_components/feed-card/feed-card";
import Sidebar from "@/components/sidebar/sidebar";
import TrendingBar from "./_components/trendingbar";
import { api } from "@/_trpc/server";
import { clerkClient } from "@clerk/nextjs";
import { FeedScroll } from "./_components/feed-scroll";

const FeedPage = async () => {
  // const posts = await api.post.getLatestPost.query({});

  

  return (<>
    {/* <Feed posts={posts}/> */}
    <FeedScroll/>
    {/* {posts.map((post) => <FeedCard post={post}/>)} */}
  </>)
}

export default FeedPage;