import { Router } from "express";
import users from "./users";
import auth from "./auth";
import post from "./post";
import comment from "./comment";

const router = Router();

router.use("/users", users);
router.use("/auth", auth);
router.use("/posts", post);
router.use("/comments", comment);

export default router;
