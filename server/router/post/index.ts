import { createPostSchema } from "@/server/model/post.model";
import { quotePriceSchema } from "@/server/model/quote.model";
import { protectedProcedure, router } from "@/server/trpc";

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

    const newPost = await ctx.prisma.post.create({
      data: {
        authorId: user.id,
        blog,
        predictionPrice,
        quote: {
          create: {
            shortName,
            longName,
            symbol,
            typeDisp,
            exchange,
            currency,
            price,
          },
        },
      },
    });

    return newPost;
  });

export const postRouter = router({
  post: router({
    createPost,
  }),
});
