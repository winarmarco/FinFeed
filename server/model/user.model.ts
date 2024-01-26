import mongoose from "mongoose";

interface IUser {
  
}

const userSchema = new mongoose.Schema<IUser>({
  userId: {type: String, required: true},
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    }
  ],
  savedPost: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    }
  ],
})

export const User = mongoose.models.User ||  mongoose.model("users", userSchema);