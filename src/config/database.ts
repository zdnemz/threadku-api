import mongoose from "mongoose";
import { env } from "./environtments";
import { logger } from "@/utils";

export const connectDatabase = async () => {
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

export const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    // logger.info("Database disconnected");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
