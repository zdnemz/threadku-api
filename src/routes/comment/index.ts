import { Router } from "express";
import { verify } from "@/middlewares";
import {
  create,
  deleteById,
  getById,
  like,
  list,
  unlike,
  updateById,
} from "@/controllers/comment";

const comment = Router();

comment.post("/create", verify, create);
comment.get("/:id", getById);
comment.delete("/:id", verify, deleteById);
comment.put("/:id", verify, updateById);
comment.get("/list", list);
comment.put("/:id/like", verify, like);
comment.delete("/:id/unlike", verify, unlike);

export default comment;
