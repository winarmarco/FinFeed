import { mergeRouters, protectedProcedure } from "./trpc";
import { publicProcedure, router } from "./trpc";
import { service } from "./service";
import * as z from "zod";

const servicesRouter = router({
  services: service,
  getSomething: protectedProcedure.query(({ input }) => {
    return [1, 2, 3, 4, 5];
  }),
});

export const appRouter = mergeRouters(servicesRouter);
export type AppRouter = typeof appRouter;
