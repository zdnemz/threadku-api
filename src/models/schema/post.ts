import mongoose from "mongoose";
import type { IPost } from "@/types/models";

export const postSchema = new mongoose.Schema<IPost>({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  medias: {
    type: [String],
    max: 4,
  },
  hastags: [String],
  comments_count: {
    type: Number,
    default: 0,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  likes_count: {
    type: Number,
    default: 0,
  },
  collections: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Collection",
  },
  collections_count: {
    type: Number,
    default: 0,
  },
  is_private: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
