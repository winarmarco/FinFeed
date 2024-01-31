import { mergeRouters, protectedProcedure } from "./trpc";
import { publicProcedure, router } from "./trpc";
import { service } from "./service";
import * as z from "zod";

const servicesRouter = router({
  services: service,
});

export const appRouter = mergeRouters(servicesRouter);
export type AppRouter = typeof appRouter;
