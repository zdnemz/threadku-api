import { threadService, userService } from "@/services/search";
import type { IFunction } from "@/types";

export const user: IFunction = async (req, res, next) => {
  try {
    await userService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const thread: IFunction = async (req, res, next) => {
  try {
    await threadService(req, res, next);
  } catch (error) {
    next(error);
  }
};
