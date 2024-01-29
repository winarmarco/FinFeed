import { mergeRouters } from "./trpc";
import { publicProcedure, router } from "./trpc";
import { service } from "./service";

const servicesRouter = router({
  services: service,
});

export const appRouter = mergeRouters(servicesRouter);
export type AppRouter = typeof appRouter;
