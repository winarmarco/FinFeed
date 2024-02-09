"use client";

import { Bookmark, Heart, MessageCircleIcon, User } from "lucide-react";

import { EditorContent, useEditor } from "@tiptap/react";
import { editorExtension } from "@/lib/constants";
import Image from "next/image";
import TradeSuggestionCard from "../../../../components/trade-suggestion-card";
import { trpc } from "@/_trpc/client";
import React from "react";

import { FeedCardButton } from "./feed-card-buttons";
import { RouterOutput } from "@/server";
import { AuthorProfile } from "./author-profile";
import { useRouter } from "next/navigation";


interface FeedCardProps {
  post: RouterOutput["post"]["getLatestPost"][0];
  
}

const FeedCard: React.FC<FeedCardProps> = ({ post }) => {
  const router = useRouter();
  const editor = useEditor({
    editable: false,
    extensions: editorExtension,
    content: post.blog,
  });

  // TRPC's
  const trpcUtils = trpc.useUtils();
  const { data: user } = trpc.user.getUser.useQuery();
  const { mutate: toggleLike } = trpc.post.toggleLikePost.useMutation({
    onSuccess: async (data) => {
      await trpcUtils.post.getLatestPost.invalidate();
      await trpcUtils.post.getPost.invalidate();
    },
  });

  const {mutate: toggleSave} = trpc.post.toggleSavePost.useMutation({
    onSuccess: async (data) => {
      await trpcUtils.post.getLatestPost.invalidate();
      await trpcUtils.post.getPost.invalidate();
    },
  })

  
  if (!user) return null;
  
  // Constants
  const likedByMe = post.likedById.some((userLikedId) => {
    return userLikedId === user.id;
  });

  const bookmarkByMe = post.savedByIds.some(
    (userSavedId) => userSavedId === user.id
  );
  
  // Handlers
  const handleCommment = (postId: string) => {
    router.push(`/post/${post.id}`);
  };

  const handleToggleLike = (postId: string) => {
    toggleLike({ postId });
  };

  const handleToggleSave = (postId: string) => {
    toggleSave({postId})
  }

  return (
    <div className="flex flex-col gap-y-4 py-10 px-6">
      <AuthorProfile author={post.author} />
      <TradeSuggestionCard
        predictionPrice={post.predictionPrice}
        quote={post.quote}
      />
      <EditorContent editor={editor} />

      <div className="flex flex-row w-[70%] justify-between gap-x-2 text-gray-400">
        <FeedCardButton
          onClick={() => handleCommment(post.id)}
          icon={<MessageCircleIcon />}
          count={post.totalComment}
        />
        <FeedCardButton
          onClick={() => handleToggleLike(post.id)}
          icon={
            <Heart className={likedByMe ? "fill-red-400 text-red-400" : ""} />
          }
          count={post.totalLike}
        />
        <FeedCardButton
          onClick={() => handleToggleSave(post.id)}
          icon={
            <Bookmark
              className={bookmarkByMe ? "fill-gray-300 text-gray-300" : ""}
            />
          }
          count={post.totalSaved}
        />
      </div>
    </div>
  );
};

export default FeedCard;
