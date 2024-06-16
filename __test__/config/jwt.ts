import { utils } from ".";
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

  return accessToken;
};
