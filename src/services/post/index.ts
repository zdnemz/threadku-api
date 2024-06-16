import { Post } from "@/models";
import type { IFunction } from "@/types";
import { responseError, responseSuccess } from "@/utils";
import { processImage } from "@/utils/imageprocessor";

export const getByIdService: IFunction = async (req, res, next) => {
  try {
    const { post_id } = req.params;

    const post = await Post.findById(post_id);
    if (!post) {
      return res
        .status(404)
        .json(responseError(404, { details: "Post not found" }));
    }

    if (post.is_private) {
      return res
        .status(403)
        .json(responseError(403, { details: "Post is private" }));
    }

    return res.status(200).json(responseSuccess(200, post));
  } catch (error) {
    next(error);
  }
};

export const getMeService: IFunction = async (req, res, next) => {
  try {
    const query = req.query;

    const is_private = query.private === "true";

    const { _id } = req.user!;

    const posts = await Post.find({ user: _id, is_private });
    if (!posts) {
      return res
        .status(404)
        .json(responseError(404, { details: "Posts not found" }));
    }

    return res.status(200).json(responseSuccess(200, posts));
  } catch (error) {
    next(error);
  }
};

export const createService: IFunction = async (req, res, next) => {
  try {
    const { content, is_private } = req.body;
    const { _id: user_id } = req.user!;

    let convertedFiles: string[] = [];

    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      const files = req.files as Express.Multer.File[];
      convertedFiles = await Promise.all(
        files.map(async (file) => {
          const image = await processImage({
            buffer: file.buffer,
            filename: file.originalname,
            filepath: "uploads/post",
          });

          return image;
        })
      );
    }

    const post = await Post.create({
      author: user_id,
      content,
      medias: convertedFiles,
      is_private,
    });

    return res.status(201).json(responseSuccess(201, post));
  } catch (error) {
    next(error);
  }
};

export const deleteByIdService: IFunction = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    if (!post_id) {
      return res
        .status(400)
        .json(responseError(400, { details: "Post id is required" }));
    }
    const { _id: user_id } = req.user!;

    const post = await Post.findOneAndDelete({ id: post_id, user: user_id });
    if (!post) {
      return res
        .status(404)
        .json(responseError(404, { details: "Post not found" }));
    }

    return res.status(200).json(responseSuccess(200));
  } catch (error) {
    next(error);
  }
};

export const likeService: IFunction = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    if (!post_id) {
      return res
        .status(400)
        .json(responseError(400, { details: "Post id is required" }));
    }

    const { _id: user_id } = req.user!;

    const post = await Post.findById(post_id);
    if (!post) {
      return res
        .status(404)
        .json(responseError(404, { details: "Post not found" }));
    }

    await post.like(user_id);

    return res.status(200).json(responseSuccess(200, post));
  } catch (error) {
    next(error);
  }
};

export const unlikeService: IFunction = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    if (!post_id) {
      return res
        .status(400)
        .json(responseError(400, { details: "Post id is required" }));
    }

    const { _id: user_id } = req.user!;

    const post = await Post.findById(post_id);
    if (!post) {
      return res
        .status(404)
        .json(responseError(404, { details: "Post not found" }));
    }

    await post.unlike(user_id);

    return res.status(200).json(responseSuccess(200));
  } catch (error) {
    next(error);
  }
};

export const collectService: IFunction = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    if (!post_id) {
      return res
        .status(400)
        .json(responseError(400, { details: "Post id is required" }));
    }

    const { _id: user_id } = req.user!;

    const post = await Post.findById(post_id);
    if (!post) {
      return res
        .status(404)
        .json(responseError(404, { details: "Post not found" }));
    }

    await post.collect(user_id);

    return res.status(200).json(responseSuccess(200, post));
  } catch (error) {
    next(error);
  }
};

export const uncollectService: IFunction = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    if (!post_id) {
      return res
        .status(400)
        .json(responseError(400, { details: "Post id is required" }));
    }

    const { _id: user_id } = req.user!;

    const post = await Post.findById(post_id);
    if (!post) {
      return res
        .status(404)
        .json(responseError(404, { details: "Post not found" }));
    }

    await post.uncollect(user_id);

    return res.status(200).json(responseSuccess(200));
  } catch (error) {
    next(error);
  }
};
