import type { IFunction } from "@/types";
import { Comment } from "@/models";
import { responseError, responseSuccess } from "@/utils";

export const createService: IFunction = async (req, res, next) => {
  try {
    const { _id: userId } = req.user!;
    const { post_id: postId, comment_id: commentId } = req.query;
    const { content } = req.body;

    if (!postId) {
      return res
        .status(400)
        .json(responseError(400, { details: "Post id is required" }));
    }

    const comment = await Comment.create({
      author: userId,
      refId: postId,
      content,
      parentId: commentId || null,
    });

    return res.status(200).json(responseSuccess(200, comment));
  } catch (error) {
    next(error);
  }
};

export const deleteByIdService: IFunction = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    if (!comment_id) {
      return res
        .status(400)
        .json(responseError(400, { details: "Comment id is required" }));
    }

    const { _id: user_id } = req.user!;

    const comment = await Comment.findOneAndDelete({
      id: comment_id,
      user: user_id,
    });
    if (!comment) {
      return res
        .status(404)
        .json(responseError(404, { details: "Comment not found" }));
    }

    return res.status(200).json(responseSuccess(200, comment));
  } catch (error) {
    next(error);
  }
};

export const getByIdService: IFunction = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    if (!comment_id) {
      return res
        .status(400)
        .json(responseError(400, { details: "Comment id is required" }));
    }

    const comment = await Comment.findById(comment_id);
    if (!comment) {
      return res
        .status(404)
        .json(responseError(404, { details: "Comment not found" }));
    }

    return res.status(200).json(responseSuccess(200, comment));
  } catch (error) {
    next(error);
  }
};

export const updateByIdService: IFunction = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    if (!comment_id) {
      return res
        .status(400)
        .json(responseError(400, { details: "Comment id is required" }));
    }

    const { _id: user_id } = req.user!;

    const comment = await Comment.findOneAndUpdate(
      { id: comment_id, user: user_id },
      req.body
    );
    if (!comment) {
      return res
        .status(404)
        .json(responseError(404, { details: "Comment not found" }));
    }

    return res.status(200).json(responseSuccess(200, comment));
  } catch (error) {
    next(error);
  }
};

export const listService: IFunction = async (req, res, next) => {
  try {
    const { post_id } = req.query;
    if (!post_id) {
      return res
        .status(400)
        .json(responseError(400, { details: "Post id is required" }));
    }

    const comments = await Comment.find({ refId: post_id });

    return res.status(200).json(responseSuccess(200, comments));
  } catch (error) {
    next(error);
  }
};

export const likeService: IFunction = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    if (!comment_id) {
      return res
        .status(400)
        .json(responseError(400, { details: "Comment id is required" }));
    }

    const { _id: user_id } = req.user!;

    const comment = await Comment.findById(comment_id);
    if (!comment) {
      return res
        .status(404)
        .json(responseError(404, { details: "Comment not found" }));
    }

    await comment.like(user_id);

    return res.status(200).json(responseSuccess(200, comment));
  } catch (error) {
    next(error);
  }
};

export const unlikeService: IFunction = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    if (!comment_id) {
      return res
        .status(400)
        .json(responseError(400, { details: "Comment id is required" }));
    }

    const { _id: user_id } = req.user!;

    const comment = await Comment.findById(comment_id);
    if (!comment) {
      return res
        .status(404)
        .json(responseError(404, { details: "Comment not found" }));
    }

    await comment.unlike(user_id);

    return res.status(200).json(responseSuccess(200, comment));
  } catch (error) {
    next(error);
  }
};
