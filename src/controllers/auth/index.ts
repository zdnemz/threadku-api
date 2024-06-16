import { loginService, logoutService } from "@/services/auth";
import type {IFunction } from "@/types";
import { responseSuccess, validate } from "@/utils";
import { loginSchema } from "@/validations";

export const check:IFunction = async (req, res, next) => {
  try {
    const { _id } = req.user!;
    res.status(200).json(responseSuccess(200, { _id }));
  } catch (error) {
    next(error);
  }
};

export const login:IFunction = async (req, res, next) => {
  try {
    const validated = validate(loginSchema, req, res);
    if (!validated) {
      return;
    }

    await loginService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const logout:IFunction = async (req, res, next) => {
  try {
    await logoutService(req, res, next);
  } catch (error) {
    next(error);
  }
};
