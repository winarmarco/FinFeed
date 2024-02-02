import { createPostSchema } from "@/server/model/post.model";
import { quotePriceSchema } from "@/server/model/quote.model";
import { protectedProcedure, router } from "@/server/trpc";
import { clerkClient } from "@clerk/nextjs";
import { users } from "@clerk/nextjs/api";
import { z } from "zod";

export const createPost = protectedProcedure
  .input(createPostSchema)
  .mutation(async ({ ctx, input }) => {
    const { userId } = ctx.auth;

    console.log(userId);

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
  .mutation(async ({ input, ctx }) => {
    const { page, dataPerPage } = input;

    const posts = await ctx.prisma.post.findMany({
      include: {
        author: {
          select: {
            userId: true,
            firstName: true,
            lastName: true,
            username: true,
            imageUrl: true,
          },
        },
        quote: true,
      },
    });

    return posts;
  });

export const postRouter = router({
  post: router({
    createPost,
    getLatestPost,
  }),
});
