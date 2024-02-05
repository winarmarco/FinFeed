"use client";

import { trpc } from "@/_trpc/client";
import { LoadingSpinner } from "@/components/ui/loading";
import { useParams } from "next/navigation";
import FeedCard from "../../_components/feed-card/feed-card";
import CommentInput from "./_components/comment-input";
import { CommentView } from "./_components/comment-view";

const PostDetailsPage = () => {
  const params = useParams();
  const { id } = params;

  const postId = Array.isArray(id) ? id[0] : id;

  const getPost = trpc.post.getPost.useQuery({ postId });
  const getComments = trpc.comments.getComments.useQuery({ postId });

  return (
    <>
      {getPost.isLoading && <LoadingSpinner />}
      {getPost.data && <FeedCard post={getPost.data} />}

      <CommentInput postId={postId} />

      {getComments.data && (
        <div className="px-4 py-6">
          <h1 className="text-lg font-bold">
            Comments ({getComments.data.length})
          </h1>
          <div className="py-2 flex flex-col divide-y-2">
            {getComments.data.map((comment) => (
              <CommentView comment={comment} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetailsPage;
