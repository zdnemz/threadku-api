import Joi from "joi";

export const loginSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(8).required(),
});