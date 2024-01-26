
import { User } from "../model/user.model";
import { connectToDB } from "../../lib/mongoose"


interface CreateUserProps {
  userId: String,
}

export const createUser = async ({
  userId
}: CreateUserProps) => {
  await connectToDB();

  const user = new User({userId});

  try {
    return await user.save();
  } catch (error) {
    throw Error(`Failed Creating User: ${error}`);
  }
}