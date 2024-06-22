import { User } from "@/models";
import type { IFunction } from "@/types";
import { responseError, responseSuccess } from "@/utils";
import fs from "fs";
import { promisify } from "util";
import bcrypt from "bcrypt";
import { processImage } from "@/utils/imageprocessor";

const unlinkAsync = promisify(fs.unlink);

export const usernameService: IFunction = async (req, res, next) => {
  try {
    const { _id, username } = req.user!;

    if (username === req.body.username) {
      return res.status(400).json(
        responseError(400, {
          details: "New username cannot be the same as old username",
        })
      );
    }

    const user = await User.findByIdAndUpdate(
      _id,
      { username: req.body.username },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json(responseError(404, { details: "User not found" }));
    }

    return res.status(200).json(responseSuccess(200, user));
  } catch (error) {
    next(error);
  }
};

export const profileService: IFunction = async (req, res, next) => {
  try {
    const { _id } = req.user!;

    const user = await User.findByIdAndUpdate(
      _id,
      {
        profile: req.body,
      },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json(responseError(404, { details: "User not found" }));
    }

    return res.status(200).json(responseSuccess(200, user));
  } catch (error) {
    next(error);
  }
};

export const uploadAvatarService: IFunction = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json(responseError(400, { details: "avatar is required" }));
    }

    const convertedFile = await processImage({
      buffer: req.file.buffer,
      filename: req.file.originalname,
      filepath: "/avatar",
    });

    const { _id } = req.user!;

    const user = await User.findByIdAndUpdate(
      _id,
      {
        profile: {
          avatar: convertedFile,
        },
      },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json(responseError(404, { details: "User not found" }));
    }

    return res.status(200).json(responseSuccess(200, user));
  } catch (error) {
    next(error);
  }
};

export const deleteAvatarService: IFunction = async (req, res, next) => {
  try {
    const { _id } = req.user!;

    const user = await User.findByIdAndUpdate(
      _id,
      {
        profile: {
          avatar: null,
        },
      },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json(responseError(404, { details: "User not found" }));
    }

    await unlinkAsync(`public/uploads/avatar/${user.profile.avatar}`);

    return res.status(200).json(responseSuccess(200, user));
  } catch (error) {
    next(error);
  }
};

export const passwordService: IFunction = async (req, res, next) => {
  try {
    const { _id } = req.user!;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(404)
        .json(responseError(404, { details: "User not found" }));
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json(responseError(400, { details: "password is incorrect" }));
    }

    if (oldPassword === newPassword) {
      return res.status(400).json(
        responseError(400, {
          details: "New password cannot be the same as old password",
        })
      );
    }

    const hashedPasword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPasword;

    await user.save();

    return res.status(204).json(responseSuccess(204));
  } catch (error) {
    next(error);
  }
};
