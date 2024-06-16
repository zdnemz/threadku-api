import Joi from "joi";

export const createCommentSchema = Joi.object({
    content: Joi.string().required(),
});