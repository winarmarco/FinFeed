"use client";

import { User } from "lucide-react";

import {
  EditorContent,
  NodeView,
  ReactNodeViewRenderer,
  useEditor,
} from "@tiptap/react";
import { editorExtension } from "@/lib/constants";
import Image from "next/image";
import TradeSuggestionCard from "./trade-suggestion-card";
import * as z from "zod";
import { tradeSuggestionSchema } from "@/server/model/trade-suggestion.model";
import { Prisma, Quote } from "@prisma/client";


const FeedCard: React.FC<{
  post: Prisma.PostGetPayload<{
    include: { author: {
      select: {
        userId: true,
            firstName: true,
            lastName: true,
            username: true,
            imageUrl: true,
      }
    }, quote: true,};
  }>;
}> = ({ post }) => {
  const { author } = post;
  const editor = useEditor({
    editable: false,
    extensions: editorExtension,
    content: post.blog,
  });


  return (
    <div className="flex flex-col gap-y-4 px-6 py-10">
      <div className="flex flex-row gap-x-2">
        <div className="p-2 w-[48px] h-[48px] flex items-center justify-center rounded-full bg-slate-200">
          <Image
            src={post.author.imageUrl}
            alt={post.author.firstName}
            width="24"
            height="24"
          />
        </div>
        <div className="flex flex-col">
          <p>{author.firstName + " " + author.lastName}</p>
          <p className="text-gray-500 text-sm">15/01/2023 23.21</p>
        </div>
      </div>
      <TradeSuggestionCard
        predictionPrice={post.predictionPrice}
        quote={post.quote}
      />

      <EditorContent editor={editor} />
    </div>
  );
};

export default FeedCard;
