"use client";
import { trpc } from "@/_trpc/client";
import FeedCard from "@/app/(dashboard)/_components/feed-card/feed-card";
import { LoadingSpinner } from "@/components/ui/loading";

export const FeedScroll: React.FC<{}> = () => {
  const { isLoading, data: posts } = trpc.post.getLatestPost.useQuery({});

  return (
    <div className="flex flex-col divide-y-2">
      {isLoading && <LoadingSpinner />}
      {posts &&
        posts.map((post, index) => <FeedCard key={index} post={post} />)}
    </div>
  );
};
