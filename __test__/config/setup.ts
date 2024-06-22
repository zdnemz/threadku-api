import mongoose from "mongoose";
import { models, utils, config } from ".";
import type { Models } from "../types";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { redis } from "../../src/config";

export const connectDb = async () => {
  try {
    await mongoose.connect(config.env.MONGO_URL as string, {
      dbName: config.env.MONGO_DB,
    });
  } catch (error) {
    utils.logger.error(error);
  }
};

export const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
    await redis.quit();
  } catch (error) {
    utils.logger.error(error);
  }
};

export const createUser = async () => {
  try {
    const user = await models.User.create({
      username: uuid().split("-")[0],
      email: `${uuid().split("-")[0]}@test.com`,
      password: await bcrypt.hash("testpassword", 10),
    });

    return user as Models.IUser;
  } catch (error) {
    utils.logger.error(error);
  }
};

export const deleteUser = async () => {
  try {
    await models.User.deleteMany({ email: { $regex: "@test.com$" } });
  } catch (error) {
    utils.logger.error(error);
  }
};
