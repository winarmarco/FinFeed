import { protectedProcedure, router } from "@/server/trpc";

const getUser = protectedProcedure.query(async ({ ctx }) => {
  const { userId } = ctx.auth;

  const user = await ctx.prisma.user.findFirstOrThrow({ where: { userId } });

  return user;
});

const getSavedPost = protectedProcedure.query(async ({ ctx }) => {
  const { userId } = ctx.auth;

  const user = await ctx.prisma.user.findFirstOrThrow({
    where: { userId },
    select: {
      savedPost: true,
    },
  });

  return user.savedPost;
});

export const userRouter = router({
  user: router({
    getUser,
  }),
});
