import mongoose, { Model, Document } from "mongoose";

export interface ILike extends Document {
  user_id: mongoose.Types.ObjectId;
  type: "thread" | "comment";
  entity_id: mongoose.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

export type ILikeModel = Model<ILike>;
