import { env } from "@/config";
import { User } from "@/models";
import type { IFunction } from "@/types";
import { jwtSign, responseError, responseSuccess } from "@/utils";

export const loginService: IFunction = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    if (!email && !username) {
      return res.status(400).json(
        responseError(400, {
          details: "Email or username is required",
        })
      );
    }
    const user = await User.findOne({ $or: [{ email }, { username }] }).select(
      "+password +is_locked +locked_until +login_attempts"
    );

    if (!user) {
      return res.status(401).json(
        responseError(401, {
          details: `${email ? "Email" : "Username"} or password is incorrect`,
        })
      );
    }

    if (user.is_locked) {
      return res.status(403).json(
        responseError(403, {
          details:
            "Your account has been locked until " +
            new Date(user.locked_until).toLocaleString(),
        })
      );
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json(
        responseError(401, {
          details: `${email ? "Email" : "Username"} or password is incorrect`,
        })
      );
    }

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

    return res.status(200).json(responseSuccess(200));
  } catch (error) {
    next(error);
  }
};

export const logoutService: IFunction = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    return res.status(200).json(responseSuccess(200));
  } catch (error) {
    next(error);
  }
};
