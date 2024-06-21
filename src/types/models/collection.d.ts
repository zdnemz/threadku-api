import mongoose, { Model, Document } from "mongoose";

export interface ICollection extends Document {
  user_id: mongoose.Types.ObjectId;
  thread_id: mongoose.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

export type ICollectionModel = Model<ICollection>;