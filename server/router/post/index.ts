import { createPostSchema } from "@/server/model/post.model";
import { quotePriceSchema } from "@/server/model/quote.model";
import { protectedProcedure, publicProcedure, router } from "@/server/trpc";
import { clerkClient } from "@clerk/nextjs";
import { users } from "@clerk/nextjs/api";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const createPost = protectedProcedure
  .input(createPostSchema)
  .mutation(async ({ ctx, input }) => {
    const { userId } = ctx.auth;

    // 1. Find User to register author
    const user = await ctx.prisma.user.findFirstOrThrow({
      where: {
        userId: userId,
      },
      select: {
        id: true,
      },
    });

    const { blog, tradeSuggestion } = input;
    const { quote, predictionPrice } = tradeSuggestion;
    const { shortName, longName, symbol, typeDisp, exchange, currency, price } =
      quote;

    // 2. Create new quote
    const newQuote = await ctx.prisma.quote.create({
      data: {
        shortName,
        longName,
        symbol,
        typeDisp,
        exchange,
        currency,
        price,
      },
    });

    // 3. Create new post and attach new quote to new post
    const newPost = await ctx.prisma.post.create({
      data: {
        authorId: user.id,
        blog,
        predictionPrice,
        quoteId: newQuote.id,
      },
    });

    return newPost;
  });

export const getLatestPost = protectedProcedure
  .input(
    z.object({
      page: z.number().default(1),
      dataPerPage: z.number().default(10),
    })
  )
  .query(async ({ input, ctx }) => {
    const { page, dataPerPage } = input;

    const posts = await ctx.prisma.post.findMany({
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            imageUrl: true,
          },
        },
        quote: true,
      },
    });

    return posts;
  });

export const getPost = publicProcedure
  .input(
    z.object({
      postId: z.string(),
    })
  )
  .query(async ({ input, ctx }) => {
    const { postId } = input;

    const result = await ctx.prisma.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            imageUrl: true,
          },
        },
        quote: true,
      },
    });

    return result;
  });

export const toggleLikePost = protectedProcedure
  .input(
    z.object({
      postId: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const { postId } = input;
    const { userId } = ctx.auth;

    // 1. find post
    const post = await ctx.prisma.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
    });

    // 2. Find user
    const user = await ctx.prisma.user.findFirstOrThrow({
      where: {
        userId: userId,
      },
    });

    // 3. Search for user in the likedBy attributes (to determine whether user has liked)
    const hasLiked = post.likedById.indexOf(user.id) !== -1;

    // 4. Make the update
    let updates;

    if (hasLiked) {
      updates = {
        likedById: {
          set: post.likedById.filter((likedUser) => likedUser !== user.id),
        },
        totalLike: {
          decrement: 1,
        },
      };
    } else {
      updates = {
        likedById: {
          set: [...post.likedById, user.id],
        },
        totalLike: {
          increment: 1,
        },
      };
    }

    const updatedPost = await ctx.prisma.post.update({
      where: { id: post.id },
      data: updates,
    });

    return updatedPost;
  });

export const toggleSavePost = protectedProcedure
  .input(
    z.object({
      postId: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const { postId } = input;
    const { userId } = ctx.auth;

    // 1. find post
    const post = await ctx.prisma.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
    });

    // 2. Find user
    const user = await ctx.prisma.user.findFirstOrThrow({
      where: {
        userId: userId,
      },
    });

    // 3. Search for user in the likedBy attributes (to determine whether user has liked)
    const hasSaved = post.savedByIds.indexOf(user.id) !== -1;

    // 4. Make the update
    let updates;

    if (hasSaved) {
      updates = {
        savedByIds: {
          set: post.likedById.filter((likedUser) => likedUser !== user.id),
        },
        totalSaved: {
          decrement: 1,
        },
      };
    } else {
      updates = {
        savedByIds: {
          set: [...post.likedById, user.id],
        },
        totalSaved: {
          increment: 1,
        },
      };
    }

    const updatedPost = await ctx.prisma.post.update({
      where: { id: post.id },
      data: updates,
    });

    return updatedPost;
  });

export const postRouter = router({
  post: router({
    createPost,
    getLatestPost,
    getPost,
    toggleLikePost,
    toggleSavePost,
  }),
});
