import {
  createService,
  deleteByIdService,
  getByIdService,
  likeService,
  listService,
  unlikeService,
  updateByIdService,
} from "@/services/comment";
import type { IFunction } from "@/types";
import { validate } from "@/utils";
import { createCommentSchema } from "@/validations";

export const create: IFunction = async (req, res, next) => {
  try {
    const validated = validate(createCommentSchema, req, res);
    if (!validated) {
      return;
    }
    await createService(validated, res, next);
  } catch (error) {
    next(error);
  }
};

export const getById: IFunction = async (req, res, next) => {
  try {
    return await getByIdService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const list: IFunction = async (req, res, next) => {
  try {
    return await listService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const deleteById: IFunction = async (req, res, next) => {
  try {
    return await deleteByIdService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const updateById: IFunction = async (req, res, next) => {
  try {
    return await updateByIdService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const like: IFunction = async (req, res, next) => {
  try {
    return await likeService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const unlike: IFunction = async (req, res, next) => {
  try {
    return await unlikeService(req, res, next);
  } catch (error) {
    next(error);
  }
};
