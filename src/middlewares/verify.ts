import { IFunction, Decoded } from "@/types";
import { jwtVerify, responseError } from "@/utils";

export const verify: IFunction = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json(responseError(401));
    }

    const decoded = jwtVerify(accessToken);

    if (!decoded) {
      return res.status(401).json(responseError(401));
    }

    req.user = decoded as Decoded;

    next();
  } catch (error) {
    return res
      .status(401)
      .json(responseError(401, { details: (error as Error).message }));
  }
};
