import { TRPCError, initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
// import { getAuth } from "@clerk/nextjs/server";
import type {
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/api";

import prisma from "@/prisma/prisma";
import { ZodError } from "zod";
import { NextRequest } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
import { auth as getAuth } from "@clerk/nextjs";

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
}

type AuthObject = ReturnType<typeof getAuth>;
/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  // const { userId }: { userId: string | null } = getAuth();
  // console.log({ userId });

  // const { auth } = opts;

  // console.log(auth);

  return {
    prisma,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

// Authentication Middleware
const isAuthed = t.middleware(async (opts) => {
  const { next, ctx } = opts;

  const auth = await getAuth();

  if (!auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      auth: { userId: "abc" },
    },
  });
});

export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
