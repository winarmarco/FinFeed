import { protectedProcedure, router } from "@/server/trpc";
import * as z from "zod";

const createComment = protectedProcedure
  .input(
    z.object({
      postId: z.string(),
      message: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { postId, message } = input;

    // 1. Get current user
    const { userId } = ctx.auth;
    const user = await ctx.prisma.user.findFirstOrThrow({ where: { userId } });

    // 2. Get post
    const post = await ctx.prisma.post.findFirstOrThrow({
      where: { id: postId },
    });

    // 3. Create comment
    const comment = await ctx.prisma.comment.create({
      data: {
        authorId: user.id,
        postId: post.id,
        message: message,
      },
    });

    return comment;
  });

export const getComments = protectedProcedure
  .input(
    z.object({
      postId: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const { postId } = input;

    const comment = await ctx.prisma.comment.findMany({
      where: { postId },
      select: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            imageUrl: true,
          },
        },
        message: true,
      },
    });

    return comment;
  });

export const commentRouter = router({
  comments: router({
    createComment,
    getComments,
  }),
});
