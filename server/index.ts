import { mergeRouters, protectedProcedure } from "./trpc";
import { publicProcedure, router } from "./trpc";
import { service } from "./router/service";
import * as z from "zod";
import { postRouter } from "./router/post";

const servicesRouter = router({
  services: service,
  getSomething: publicProcedure.query(({ ctx }) => {
    return `HELLO UNKNONW`;
  }),
});

export const appRouter = mergeRouters(servicesRouter, postRouter);
export type AppRouter = typeof appRouter;
