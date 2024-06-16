import { create, getByUsername, getMe } from "@/controllers/user";
import { Router } from "express";
import { update } from "./update";
import { verify } from "@/middlewares";

const users = Router();

users.post("/create", create);
users.get("/me", verify, getMe);
users.get("/:username", getByUsername);
users.use("/update", verify, update);

export default users;
