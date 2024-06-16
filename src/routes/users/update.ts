import {
  deleteAvatar,
  password,
  profile,
  uploadAvatar,
  username,
} from "@/controllers/user/update";
import { Router } from "express";
import type { IMulterOptions } from "@/types";
import uploadMiddleware from "@/middlewares/upload";

const multerOptions: IMulterOptions = {
  fileTypes: /png|jpg|jpeg|gif/,
  fileSize: 1024 * 1024 * 5,
};

export const update = Router();

update.put("/username", username);
update.put("/profile", profile);
update.put("/password", password);
update.put(
  "/avatar",
  uploadMiddleware(multerOptions, "single", "avatar"),
  uploadAvatar
);
update.delete("/avatar", deleteAvatar);
