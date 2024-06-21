import Joi from "joi";
import type { Request, Response } from "express";
import { responseError } from "./response";

/**
 * @example
 * const { validate } = require('./validator');
 * const Joi = require('joi');
 * 
 * const schema = Joi.object({
 *   name: Joi.string().required(),
 *   email: Joi.string().email().required(),
 * });
 * 
 * const validated = validate(schema, req, res);
 * 
 * @function validate
 * @param schema - Joi schema
 * @param req - express request
 * @param res - express response
 * @returns - validated express request
 */

export const validate = (
  schema: Joi.ObjectSchema,
  req: Request,
  res: Response
) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json(
      responseError(400, {
        details: error.details.map((e) => e.message),
      })
    );

    return;
  } else {
    return { ...req, body: value } as Request;
  }
};

