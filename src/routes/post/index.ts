import { Router } from "express";
import { update } from "./update";
import { verify } from "@/middlewares";
import { upload } from "@/utils";
import {
  collect,
  create,
  deleteById,
  getById,
  getMe,
  like,
  uncollect,
  unlike,
} from "@/controllers/post";
import type { IMulterOptions } from "@/types";

const multerOptions: IMulterOptions = {
  fileTypes: /png|jpg|jpeg|gif/,
  fileSize: 1024 * 1024 * 5,
};

const uploadMiddleware = upload(multerOptions).array("posts", 4);

const post = Router();

post.get("/:post_id", getById);
post.get("/me", verify, getMe);
post.post("/create", verify, uploadMiddleware, create);
post.use("/:post_id", verify, update);
post.delete("/:post_id", verify, deleteById);
post.put("/:post_id/like", verify, like);
post.delete("/:post_id/unlike", verify, unlike);
post.put("/:post_id/collect", verify, collect);
post.delete("/:post_id/uncollect", verify, uncollect);

export default post;
