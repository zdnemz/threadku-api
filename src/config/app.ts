import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { env } from "@/config";
import { error } from "@/middlewares";
import router from "@/routes";
import { limiter, responseError, responseSuccess } from "@/utils";

export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/uploads"));
app.use(cookieparser());
app.use(limiter);

// health check
app.get("/api/health", async (req, res) => {
  res.status(200).json(responseSuccess(200));
});

// routes
app.use("/api", router);

// 404 handler
app.use((req, res) => {
  res.status(404).json(responseError(404));
});

// error handler
app.use(error);
