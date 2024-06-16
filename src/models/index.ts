import user from "./method/user";
import post from "./method/post";
import comment from "./method/comment";
import notification from "./method/notification";
import mongoose from "mongoose";
import { ICommentModel, INotificationModel, IPostModel, IUserModel } from "@/types/models";

export const User: IUserModel = mongoose.model("User", user);
export const Post: IPostModel = mongoose.model("Post", post);
export const Comment: ICommentModel = mongoose.model("Comment", comment);
export const Notification: INotificationModel = mongoose.model(
  "Notification",
  notification
);
