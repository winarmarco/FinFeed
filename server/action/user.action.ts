
import { User } from "../model/user.model";
import { connectToDB } from "../../lib/mongoose"
import { trpc } from "@/_trpc/client";
import prisma from "@/prisma/prisma";
import { TRPCError } from "@trpc/server";




interface CreateUserProps {
  userId: string,
}

export const createUser = async ({
  userId
}: CreateUserProps) => {
  // await connectToDB();
  try {
    
    const user = await prisma.user.create({
      data: {
        userId: userId,
      }
    })

    return {
      status: 'success',
      data: {
        user,
      }
    }

  } catch (error: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: error.message,
    });
  }
}