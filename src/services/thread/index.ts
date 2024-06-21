import { Like, Thread } from "@/models";
import type { Decoded, IFunction } from "@/types";
import { jwtVerify, responseError, responseSuccess } from "@/utils";
import { processImage } from "@/utils/imageprocessor";

export const getByIdService: IFunction = async (req, res, next) => {
  try {
    const { thread_id } = req.params;
    const { accessToken } = req.cookies;

    const decoded: Decoded = accessToken && jwtVerify(accessToken);

    const thread = await Thread.findById(thread_id);
    if (!thread) {
      return res
        .status(404)
        .json(responseError(404, { details: "thread not found" }));
    }

    if (thread.is_private) {
      return res
        .status(403)
        .json(responseError(403, { details: "thread is private" }));
    }

    const isLiked = decoded && (await thread.isLiked(decoded._id));
    const isCollected = decoded && (await thread.isCollected(decoded._id));

    return res.status(200).json(
      responseSuccess(200, {
        ...thread,
        is_liked: isLiked,
        is_collected: isCollected,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const getMeService: IFunction = async (req, res, next) => {
  try {
    const query = req.query;

    const is_private = query.private === "true";

    const { _id: user_id } = req.user!;

    const threads = await Thread.find({ user: user_id, is_private })
      .limit(10)
      .skip(10 * (Number(query.page) - 1));
    if (!threads) {
      return res
        .status(404)
        .json(responseError(404, { details: "threads not found" }));
    }

    const isLiked = await Promise.all(
      threads.map(async (thread) => await thread.isLiked(user_id))
    );
    const isCollected = await Promise.all(
      threads.map(async (thread) => await thread.isCollected(user_id))
    );

    return res.status(200).json(
      responseSuccess(
        200,
        threads.map((thread, index) => {
          return {
            ...thread,
            is_liked: isLiked[index],
            is_collected: isCollected[index],
          };
        })
      )
    );
  } catch (error) {
    next(error);
  }
};

export const createService: IFunction = async (req, res, next) => {
  try {
    const { content, is_private } = req.body;
    const { _id: user_id } = req.user!;

    const hashtags = Array.from(
      content.matchAll(/#(\w+)/g),
      (match: Array<string>) => match[1]
    );

    let convertedFiles: string[] = [];

    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      const files = req.files as Express.Multer.File[];
      convertedFiles = await Promise.all(
        files.map(async (file) => {
          const image = await processImage({
            buffer: file.buffer,
            filename: file.originalname,
            filepath: "uploads/thread",
          });

          return image;
        })
      );
    }

    const thread = await Thread.create({
      author: user_id,
      content,
      medias: convertedFiles,
      hashtags,
      is_private,
    });

    return res.status(201).json(responseSuccess(201, thread));
  } catch (error) {
    next(error);
  }
};

export const updateByIdService: IFunction = async (req, res, next) => {
  try {
    const { thread_id } = req.params;
    if (!thread_id) {
      return res
        .status(400)
        .json(responseError(400, { details: "thread id is required" }));
    }
    const { _id: user_id } = req.user!;
    const { content, is_private } = req.body;
    const thread = await Thread.findOneAndUpdate(
      { id: thread_id, user: user_id },
      { content, is_private, updated_at: new Date() }
    );
    if (!thread) {
      return res
        .status(404)
        .json(responseError(404, { details: "thread not found" }));
    }

    return res.status(204).json(responseSuccess(204));
  } catch (error) {
    next(error);
  }
};

export const deleteByIdService: IFunction = async (req, res, next) => {
  try {
    const { thread_id } = req.params;
    if (!thread_id) {
      return res
        .status(400)
        .json(responseError(400, { details: "thread id is required" }));
    }
    const { _id: user_id } = req.user!;

    const thread = await Thread.findOneAndDelete({
      id: thread_id,
      user: user_id,
    });
    if (!thread) {
      return res
        .status(404)
        .json(responseError(404, { details: "thread not found" }));
    }

    return res.status(204).json(responseSuccess(204));
  } catch (error) {
    next(error);
  }
};

export const likeService: IFunction = async (req, res, next) => {
  try {
    const { thread_id } = req.params;
    if (!thread_id) {
      return res
        .status(400)
        .json(responseError(400, { details: "thread id is required" }));
    }

    const { _id: user_id } = req.user!;

    const thread = await Thread.findByIdAndUpdate(thread_id, {
      likes_count: { $inc: 1 },
    });
    if (!thread) {
      return res
        .status(404)
        .json(responseError(404, { details: "thread not found" }));
    }

    if (await thread.isLiked(user_id)) {
      return res
        .status(400)
        .json(responseError(400, { details: "thread already liked" }));
    }

    const like = await Like.create({
      user_id,
      type: "thread",
      entity_id: thread_id,
    });
    if (!like) {
      return res
        .status(500)
        .json(responseError(500, { details: "failed to like thread" }));
    }

    return res.status(204).json(responseSuccess(204));
  } catch (error) {
    next(error);
  }
};

export const unlikeService: IFunction = async (req, res, next) => {
  try {
    const { thread_id } = req.params;
    if (!thread_id) {
      return res
        .status(400)
        .json(responseError(400, { details: "thread id is required" }));
    }

    const { _id: user_id } = req.user!;

    const thread = await Thread.findByIdAndUpdate(thread_id, {
      likes_count: { $inc: -1 },
    });
    if (!thread) {
      return res
        .status(404)
        .json(responseError(404, { details: "thread not found" }));
    }

    await Like.deleteOne({ user_id, type: "thread", entity_id: thread_id });

    return res.status(204).json(responseSuccess(204));
  } catch (error) {
    next(error);
  }
};
