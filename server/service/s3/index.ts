"use server"

import {auth} from "@clerk/nextjs";

export async function getSignedURL() {
  const session = await auth();

  if (!session) {
    return {error: "Not authenticated"}
  }

  return {status: "success", data: {url: ""}}
}