import {
  deleteAvatarService,
  passwordService,
  profileService,
  uploadAvatarService,
  usernameService,
} from "@/services/user/update";
import type { IFunction } from "@/types";
import { responseError, validate } from "@/utils";
import { updateUserProfileSchema, updateUsernameSchema } from "@/validations";
import fileTypeChecker from "file-type-checker";

export const username: IFunction = async (req, res, next) => {
  try {
    const validated = validate(updateUsernameSchema, req, res);

    if (!validated) {
      return;
    }

    await usernameService(validated, res, next);
  } catch (error) {
    next(error);
  }
};

export const profile: IFunction = async (req, res, next) => {
  try {
    const { gender, name, bio } = req.body;

    if (!gender && !name && !bio) {
      return res.status(400).json(
        responseError(400, {
          details: "None of the required fields are provided",
        })
      );
    }

    const validated = validate(updateUserProfileSchema, req, res);

    if (!validated) {
      return;
    }

    await profileService(validated, res, next);
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar: IFunction = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json(responseError(400, { details: "avatar is required 12" }));
    }

    const validatedFileType = fileTypeChecker.validateFileType(
       req.file.buffer,
       ["png", "jpeg", "gif"]
     );

    if (!validatedFileType) {
      return res
        .status(400)
        .json(responseError(400, { details: "Invalid file type" }));
    }

    await uploadAvatarService(req, res, next);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteAvatar: IFunction = async (req, res, next) => {
  try {
    await deleteAvatarService(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const password: IFunction = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res
        .status(400)
        .json(responseError(400, { details: "Password is required" }));
    }
    await passwordService(req, res, next);
  } catch (error) {
    next(error);
  }
};
