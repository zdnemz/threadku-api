import { Router } from "express";
import { verify } from "@/middlewares";
import { upload } from "@/utils";
import {
  create,
  deleteById,
  getById,
  getMe,
  like,
  unlike,
} from "@/controllers/thread";
import type { IMulterOptions } from "@/types";
import { update } from "../users/update";

const multerOptions: IMulterOptions = {
  fileTypes: /png|jpg|jpeg|gif/,
  fileSize: 1024 * 1024 * 5,
};

const uploadMiddleware = upload(multerOptions).array("posts", 4);

const post = Router();

post.get("/:thread_id", getById);
post.get("/me", verify, getMe);
post.post("/create", verify, uploadMiddleware, create);
post.use("/:thread_id", verify, update);
post.delete("/:thread_id", verify, deleteById);
post.put("/:thread_id/like", verify, like);
post.delete("/:thread_id/unlike", verify, unlike);

export default post;
