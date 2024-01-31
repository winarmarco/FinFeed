import { router } from "../trpc";
import { finance } from "./finance/route";

const serviceRouter = router({
  finance,
});

export const service = serviceRouter;
