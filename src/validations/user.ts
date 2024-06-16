import Joi from "joi";

export const createUserSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9._]*$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("user").default("user"),
});

export const updateUsernameSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9._]*$/)
    .required(),
});

export const updateUserProfileSchema = Joi.object({
  gender: Joi.string().valid("male", "female", "unknown"),
  name: Joi.string(),
  bio: Joi.string(),
});
