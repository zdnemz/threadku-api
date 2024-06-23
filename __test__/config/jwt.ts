import { utils } from ".";
import { redis } from "../../src/config";
import type { Models } from "../types";

export const token = (user: Models.IUser) => {
  const accessToken = utils.jwtSign(
    {
      _id: user.id,
      username: user.username,
      email: user.email,
    },
    {
      expiresIn: "5m",
    }
  );

  redis.set(`accessToken:${accessToken}-userId:${user._id}`, "valid", "EX", 60 * 5);
  
  return accessToken;
};
