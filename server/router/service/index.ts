import { router } from "../../trpc";
import { finance } from "./finance/route";
import { s3 } from "./s3/route";

const serviceRouter = router({
  finance,
  s3,
});

export const service = serviceRouter;
