import { router } from "../trpc";
import { finance } from "./finance";

const serviceRouter = router({
  finance,
});

export const service = serviceRouter;
