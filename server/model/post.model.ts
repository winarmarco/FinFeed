import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  stockCode: {
    type: String,
    required: true,
  },
  targetPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  initPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
  },
  fileAttached: [{
    type: String,
  }]
})

export const Post = mongoose.models.Post ||  mongoose.model("posts", postSchema);