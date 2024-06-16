import {
  collectService,
  createService,
  deleteByIdService,
  getByIdService,
  getMeService,
  likeService,
  uncollectService,
  unlikeService,
} from "@/services/post";
import type { IFunction } from "@/types";
import { validate } from "@/utils";
import { createPostSchema } from "@/validations/post";

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

export const collect: IFunction = async (req, res, next) => {
  try {
    await collectService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const uncollect: IFunction = async (req, res, next) => {
  try {
    await uncollectService(req, res, next);
  } catch (error) {
    next(error);
  }
};