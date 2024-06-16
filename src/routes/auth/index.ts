import { check, login, logout } from "@/controllers/auth";
import { verify } from "@/middlewares";
import { Router } from "express";

const auth = Router();

auth.get("/check", verify, check);
auth.post("/login", login);
auth.delete("/logout", verify, logout);

export default auth;
