
import { User } from "../model/user.model";
import { connectToDB } from "../../lib/mongoose"





interface CreateUserProps {
  userId: String,
}

export const createUser = async ({
  userId
}: CreateUserProps) => {
  // await connectToDB();


  try {
    

    const newUser = await prisma

  } catch (error) {
    throw Error(`Failed Creating User: ${error}`);
  }
}