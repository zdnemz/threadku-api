import user from "./method/user";
import like from "./method/like";
import collection from "./method/collection";
import thread from "./method/thread";
import comment from "./method/comment";
import notification from "./method/notification";
import mongoose from "mongoose";
import {
  ICommentModel,
  ILikeModel,
  INotificationModel,
  IThreadModel,
  IUserModel,
} from "@/types/models";
import { ICollectionModel } from "@/types/models/collection";

export const User: IUserModel = mongoose.model("User", user);
export const Thread: IThreadModel = mongoose.model("thread", thread);
export const Comment: ICommentModel = mongoose.model("Comment", comment);
export const Notification: INotificationModel = mongoose.model(
  "Notification",
  notification
);
export const Like: ILikeModel = mongoose.model("Like", like);
export const Collection: ICollectionModel = mongoose.model(
  "Collection",
  collection
);
