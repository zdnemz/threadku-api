import mongoose from "mongoose";
import { ILike } from "@/types/models";

export const likeSchema = new mongoose.Schema<ILike>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["thread", "comment"],
    required: true,
  },
  entity_id: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "type",
    required: true,
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
