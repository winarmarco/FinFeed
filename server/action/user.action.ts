import { User } from "../model/user.model";
import { connectToDB } from "../../lib/mongoose";
import { trpc } from "@/_trpc/client";
import prisma from "@/prisma/prisma";
import { TRPCError } from "@trpc/server";
import { UserJSON } from "@clerk/nextjs/server";
import crypto from "crypto";

interface CreateUserProps {
  user: UserJSON;
}

const generateUsername = ({
  firstName,
  lastName,
  bytes = 8,
}: {
  firstName: string;
  lastName: string;
  bytes?: number;
}) => {
  const postfix = crypto.randomBytes(bytes).toString("hex");
  const noSpaceFirstName = firstName.split(" ").join("_");
  const noSpaceLastName = lastName.split(" ").join("_");
  return `${noSpaceFirstName}_${noSpaceLastName}_${postfix}`;
};

export const createUser = async ({ user }: CreateUserProps) => {
  // await connectToDB();
  try {
    const {
      id,
      email_addresses,
      first_name,
      last_name,
      username,
      phone_numbers,
      has_image,
      image_url,
    } = user;

    const newUser = await prisma.user.create({
      data: {
        userId: id,
        emailAddreses: email_addresses.map((item) => item.email_address),
        phoneNumbers: phone_numbers.map((item) => item.phone_number),
        firstName: first_name,
        lastName: last_name,
        hasImage: has_image,
        imageUrl: image_url,
        username:
          username ||
          generateUsername({ firstName: first_name, lastName: last_name }),
      },
    });

    return {
      status: "success",
      data: {
        newUser,
      },
    };
  } catch (error: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }
};
