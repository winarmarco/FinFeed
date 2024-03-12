"use client";
import { trpc } from "@/_trpc/client";
import FeedCard from "@/app/(dashboard)/_components/feed-card/feed-card";
import { FeedScroll } from "@/app/(dashboard)/_components/feed-scroll";
import { LoadingSpinner } from "@/components/ui/loading";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const UserPost = () => {
  const router = useRouter();
  const pathname = usePathname();
  const userId = pathname.split("/")[2];
  const { isLoading, data: posts } = trpc.post.getUserPost.useQuery({id: userId});

  return (
    <div className="flex flex-col divide-y-2">
      {isLoading && <LoadingSpinner />}
      {posts &&
        posts.map((post, index) => (
          <div
            key={post.id}
            className="hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => router.push(`/post/${post.id}`)}
          >
            <FeedCard key={index} post={post} />
          </div>
        ))}
    </div>
  );
}

export default UserPost;