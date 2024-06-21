import mongoose from "mongoose";
import type { IThread } from "@/types/models";

function arrayLimit(val: string[]) {
  return val.length <= 4;
}

export const threadSchema = new mongoose.Schema<IThread>({
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
    validate: [arrayLimit, "Max 4 medias allowed"],
  },
  hashtags: [String],
  comments_count: {
    type: Number,
    default: 0,
  },
  likes_count: {
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
