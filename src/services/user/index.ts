import type { IFunction } from "@/types";
import { User } from "@/models";
import { jwtSign, logger, responseError, responseSuccess } from "@/utils";
import bcyrpt from "bcrypt";
import { env } from "@/config";

export const createService: IFunction = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const isExist = await User.findOne({ $or: [{ email }, { username }] });
    if (isExist) {
      return res
        .status(400)
        .json(responseError(400, { details: "User already exists" }));
    }

    const hashedPasword = await bcyrpt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPasword,
      role: "user",
      profile: {
        status: "active",
        gender: "unknown",
        name: null,
        avatar: null,
        bio: null,
      },
    });

    logger.info(`${user.email} [${user._id}] has been created`);

    const token = jwtSign(
      { _id: user.id, username: user.username, email: user.email },
      {
        expiresIn: "7d",
      }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(responseSuccess(201, "User created"));
  } catch (error) {
    next(error);
  }
};

export const getMeService: IFunction = async (req, res, next) => {
  try {
    const { _id: user_id } = req.user!;

    const user = await User.findById(user_id).select("-password -role");
    if (!user) {
      return res
        .status(404)
        .json(responseError(404, { details: "User not found" }));
    }

    return res.status(200).json(responseSuccess(200, user));
  } catch (error) {
    next(error);
  }
};

export const getByUsernameService: IFunction = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select("id username profile");
    if (!user) {
      return res
        .status(404)
        .json(responseError(404, { details: "User not found" }));
    }

    return res.status(200).json(responseSuccess(200, user));
  } catch (error) {
    next(error);
  }
};
