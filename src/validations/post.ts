import Joi from "joi";

export const createPostSchema = Joi.object({
  content: Joi.string().required(),
});
