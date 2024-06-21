import {
  createService,
  deleteByIdService,
  getByIdService,
  getMeService,
  likeService,
  unlikeService,
  updateByIdService,
} from "@/services/thread";
import type { IFunction } from "@/types";
import { validate } from "@/utils";
import { createPostSchema } from "@/validations/thread";

export const getById: IFunction = async (req, res, next) => {
  try {
    return await getByIdService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const getMe: IFunction = async (req, res, next) => {
  try {
    return getMeService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const create: IFunction = async (req, res, next) => {
  try {
    const validated = validate(createPostSchema, req, res);

    if (!validated) {
      return;
    }

    await createService(validated, res, next);
  } catch (error) {
    next(error);
  }
};

export const updateById: IFunction = async (req, res, next) => {
  try {
    await updateByIdService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const deleteById: IFunction = async (req, res, next) => {
  try {
    await deleteByIdService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const like: IFunction = async (req, res, next) => {
  try {
    await likeService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const unlike: IFunction = async (req, res, next) => {
  try {
    await unlikeService(req, res, next);
  } catch (error) {
    next(error);
  }
};
