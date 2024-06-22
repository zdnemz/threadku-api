import mongoose from "mongoose";
import { env } from "./environtments";
import { logger } from "@/utils";
import { Redis } from "ioredis";

export const connectMongoDb = async () => {
  try {
    const { MONGO_URL } = env;
    await mongoose.connect(MONGO_URL, {
      dbName: env.MONGO_DB,
    });
    // logger.info("Database connected");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export const disconnectMongoDb = async () => {
  try {
    await mongoose.disconnect();
    // logger.info("Database disconnected");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  db: env.REDIS_DB,
});