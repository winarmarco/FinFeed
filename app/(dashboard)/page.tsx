import FeedCard from "@/components/feed-card";
import Sidebar from "@/components/sidebar/sidebar";
import TrendingBar from "./_components/trendingbar";
import { api } from "@/_trpc/server";
import { clerkClient } from "@clerk/nextjs";
import { Feed } from "./_components/feed";

const FeedPage = async () => {
  const posts = await api.post.getLatestPost.mutate({});

  return (<>
    <Feed posts={posts}/>
    {/* {posts.map((post) => <FeedCard post={post}/>)} */}
  </>)
}

export default FeedPage;