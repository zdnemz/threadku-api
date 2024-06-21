import { thread, user } from "@/controllers/search";
import { Router } from "express";

const search = Router();

search.get("/user", user);
search.get("/thread", thread);

export default search;
