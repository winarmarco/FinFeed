"use client";
import { trpc } from "@/_trpc/client";
import FeedCard from "@/app/(dashboard)/_components/feed-card/feed-card";
import { LoadingSpinner } from "@/components/ui/loading";
import { useRouter } from "next/navigation";

export const FeedScroll: React.FC<{}> = () => {
  const router = useRouter();
  const { isLoading, data: posts } = trpc.post.getLatestPost.useQuery({});

  return (
    <div className="flex flex-col divide-y-2">
      {isLoading && <LoadingSpinner />}
      {posts &&
        posts.map((post, index) => (
          <div
            className="hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => router.push(`/post/${post.id}`)}
          >
            <FeedCard key={index} post={post} />
          </div>
        ))}
    </div>
  );
};
