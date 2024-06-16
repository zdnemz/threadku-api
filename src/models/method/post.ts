import type { IPost } from "@/types/models";
import { postSchema } from "../schema/post";
import mongoose from "mongoose";

postSchema.methods.like = async function (this: IPost, user_id: string) {
  if (!(await this.isLiked(user_id))) {
    this.likes.push(new mongoose.Types.ObjectId(user_id));
    this.likes_count += 1;
    await this.save();
  }
};

postSchema.methods.unlike = async function (this: IPost, user_id: string) {
  if (await this.isLiked(user_id)) {
    this.likes = this.likes.filter((item) => item.toString() !== user_id);
    this.likes_count -= 1;
    await this.save();
  }
};

postSchema.methods.isLiked = async function (this: IPost, user_id: string) {
  const id = new mongoose.Types.ObjectId(user_id);
  return this.likes.includes(id);
};

postSchema.methods.collect = async function (this: IPost, user_id: string) {
  if (!(await this.isCollected(user_id))) {
    this.collections.push(new mongoose.Types.ObjectId(user_id));
    this.collections_count += 1;
    await this.save();
  }
};

postSchema.methods.uncollect = async function (this: IPost, user_id: string) {
  if (await this.isCollected(user_id)) {
    this.collections = this.collections.filter(
      (item) => item.toString() !== user_id
    );
    this.collections_count -= 1;
    await this.save();
  }
};

postSchema.methods.isCollected = async function (this: IPost, user_id: string) {
  const id = new mongoose.Types.ObjectId(user_id);
  return this.collections.includes(id);
};

export default postSchema;
