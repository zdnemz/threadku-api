import { Router } from "express";
import users from "./users";
import auth from "./auth";
import thread from "./thread";
import comment from "./comment";
import explore from "./explore";
import search from "./search";

const router = Router();

router.use("/users", users);
router.use("/auth", auth);
router.use("/threads", thread);
router.use("/comments", comment);
router.use("/explore", explore);
router.use("/search", search);

export default router;
