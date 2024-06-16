import {
  createService,
  getByUsernameService,
  getMeService,
} from "@/services/user";
import type { IFunction } from "@/types";
import { validate } from "@/utils";
import { createUserSchema } from "@/validations";

export const create: IFunction = async (req, res, next) => {
  try {
    const validated = validate(createUserSchema, req, res);

    if (!validated) {
      return;
    }

    await createService(validated, res, next);
  } catch (error) {
    next(error);
  }
};

export const getMe: IFunction = async (req, res, next) => {
  try {
    await getMeService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const getByUsername: IFunction = async (req, res, next) => {
  try {
    await getByUsernameService(req, res, next);
  } catch (error) {
    next(error);
  }
};
