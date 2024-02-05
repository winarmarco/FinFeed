import { mergeRouters, protectedProcedure } from "./trpc";
import { publicProcedure, router } from "./trpc";
import { service } from "./router/service";
import * as z from "zod";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { postRouter } from "./router/post";
import { userRouter } from "./router/user";
import { commentRouter } from "./router/comment";

const servicesRouter = router({
  services: service,
  getSomething: publicProcedure.query(({ ctx }) => {
    return `HELLO UNKNONW`;
  }),
});

export const appRouter = mergeRouters(
  servicesRouter,
  postRouter,
  userRouter,
  commentRouter
);
export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
export type AppRouter = typeof appRouter;
