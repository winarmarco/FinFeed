import { publicProcedure, router } from "@/server/trpc";
import { auth } from "@clerk/nextjs";

export const getSignedURL = publicProcedure.query(async () => {
  const session = await auth();

  if (!session) {
    return { error: "Not authenticated" };
  }

  return { status: "success", data: { url: "" } };
});

const s3Router = router({
  getSignedURL,
});

export const s3 = s3Router;
