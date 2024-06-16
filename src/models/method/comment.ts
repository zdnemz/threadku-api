import type { IComment } from "@/types/models";
import { commentSchema } from "../schema/comment";
import mongoose from "mongoose";

commentSchema.methods.like = async function (this: IComment, user_id: string) {
  if (!(await this.isLiked(user_id))) {
    this.likes.push(new mongoose.Types.ObjectId(user_id));
    this.likes_count += 1;
    await this.save();
  }
};

commentSchema.methods.unlike = async function (
  this: IComment,
  user_id: string
) {
  if (await this.isLiked(user_id)) {
    this.likes = this.likes.filter((item) => item.toString() !== user_id);
    this.likes_count -= 1;
    await this.save();
  }
};

commentSchema.methods.isLiked = async function (
  this: IComment,
  user_id: string
) {
  const id = new mongoose.Types.ObjectId(user_id);
  return this.likes.includes(id);
};

export default commentSchema;
