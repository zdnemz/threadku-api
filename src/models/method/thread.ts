import type { IThread } from "@/types/models";
import { threadSchema } from "../schema/thread";
import mongoose from "mongoose";
import { Collection, Like } from "..";

threadSchema.methods.isLiked = async function (this: IThread, user_id: string) {
  const id = new mongoose.Types.ObjectId(user_id);

  const liked = await Like.findOne({
    user_id: id,
    type: "thread",
    entity_id: this._id,
  });

  return !!liked;
};

threadSchema.methods.isCollected = async function (
  this: IThread,
  user_id: string
) {
  const id = new mongoose.Types.ObjectId(user_id);

  const collected = await Collection.findOne({
    user_id: id,
    thread_id: this._id,
  });

  return !!collected;
};

export default threadSchema;
