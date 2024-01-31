import { authMiddleware, withClerkMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// export default authMiddleware({
//   publicRoutes: ["/api/webhooks/clerk", "/(api|trpc)(.*)"],
//   ignoredRoutes: ["/api/webhook/clerk", "/(api|trpc)(.*)"],
// });

export default withClerkMiddleware((req: NextRequest) => {
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};
