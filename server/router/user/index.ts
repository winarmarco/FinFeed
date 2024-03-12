import { protectedProcedure, router } from "@/server/trpc";
import * as z from "zod";

const getUser = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ input, ctx }) => {
    const { id } = input;

    const user = await ctx.prisma.user.findFirstOrThrow({ where: { id } });

    return user;
  });

const getCurrentUser = protectedProcedure.query(async ({ ctx }) => {
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

const toggleFollowUser = protectedProcedure
  .input(
    z.object({
      targetId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { userId } = ctx.auth;
    const { targetId } = input;

    // Prevent self-follow/unfollow
    if (userId === targetId) {
      throw new Error("You cannot follow or unfollow yourself.");
    }

    // Retrieve both users concurrently for efficiency
    const [user, target] = await Promise.all([
      ctx.prisma.user.findFirstOrThrow({ where: { userId } }),
      ctx.prisma.user.findFirstOrThrow({ where: { id: targetId } }),
    ]);

    // Determine if the current user is already following the target
    const isFollowing = user.followingIds.includes(target.id);

    if (isFollowing) {
      // Already following, so unfollow
      if (!user.followingIds.includes(target.id)) {
        throw new Error("You are not following this user.");
      }
    } else {
      // Not following, so follow
      if (user.followingIds.includes(target.id)) {
        throw new Error("You are already following this user.");
      }
    }

    // Update both users in a transaction for atomicity
    await ctx.prisma.$transaction([
      ctx.prisma.user.update({
        where: { id: user.id },
        data: {
          followingIds: isFollowing
            ? user.followingIds.filter((id) => id !== target.id)
            : [...user.followingIds, target.id],
          totalFollowing: isFollowing
            ? user.totalFollowing - 1
            : user.totalFollowing + 1,
        },
      }),
      ctx.prisma.user.update({
        where: { id: target.id },
        data: {
          followersIds: isFollowing
            ? target.followersIds.filter((id) => id !== user.id)
            : [...target.followersIds, user.id],
          totalFollowers: isFollowing
            ? target.totalFollowers - 1
            : target.totalFollowers + 1,
        },
      }),
    ]);

    // Return a simple action result
    return {
      action: isFollowing ? "unfollowed" : "followed",
      targetId: target.id,
      userId: user.id,
    };
  });

export const userRouter = router({
  user: router({
    getUser,
    getCurrentUser,
    toggleFollowUser,
  }),
});
