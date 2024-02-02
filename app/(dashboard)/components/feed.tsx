"use client";
import FeedCard from "@/components/feed-card";
import { useLivePrice } from "@/lib/context/useLivePrice";
import { Prisma } from "@prisma/client";

interface FeedProps {
  posts: Prisma.PostGetPayload<{
    include: { author: {
      select: {
        userId: true,
            firstName: true,
            lastName: true,
            username: true,
            imageUrl: true,
      }
    }, quote: true,};
  }>[]
}



export const Feed: React.FC<FeedProps> = ({posts}) => {

  return <main>
    {posts.map((post, index) => <FeedCard key={index} post={post}/>)}
  </main>
}