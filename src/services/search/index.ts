import { Thread, User } from "@/models";
import type { IFunction } from "@/types";
import { responseError, responseSuccess } from "@/utils";

export const userService: IFunction = async (req, res, next) => {
  try {
    const { q, page } = req.query;
    if (!q) {
      return res
        .status(400)
        .json(responseError(400, { details: "Search query is required" }));
    }

    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: "i" } },
        { name: { $regex: q, $options: "i" } },
      ],
    })
      .select("id username name profile")
      .sort({ createdAt: -1 })
      .skip(10 * (Number(page) - 1))
      .limit(10);

    return res.status(200).json(responseSuccess(200, users));
  } catch (error) {
    next(error);
  }
};

export const threadService: IFunction = async (req, res, next) => {
  try {
    const { q, page } = req.query;
    if (!q) {
      return res
        .status(400)
        .json(responseError(400, { details: "Search query is required" }));
    }

    const threads = await Thread.find({
      $or: [
        { content: { $regex: q, $options: "i" } },
        { hashtags: { $regex: q, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(10 * (Number(page) - 1))
      .limit(10);

    return res.status(200).json(responseSuccess(200, threads));
  } catch (error) {
    next(error);
  }
};