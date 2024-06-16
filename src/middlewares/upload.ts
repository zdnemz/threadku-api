// uploadMiddleware.ts
import { IMulterOptions } from "@/types";
import { responseError, upload } from "@/utils";
import { RequestHandler } from "express";
import multer from "multer";

// Define tuple types for the arguments of each multer method
type MulterMethodArgs = {
  single: [string];
  array: [string, number?];
  fields: [readonly multer.Field[]];
  any: [];
  none: [];
};

// Create a type that represents all possible method names
type MulterMethod = keyof MulterMethodArgs;

const uploadMiddleware = <T extends MulterMethod>(
  options: IMulterOptions,
  method: T,
  ...args: MulterMethodArgs[T]
): RequestHandler => {
  const multerUpload = (
    upload(options)[method] as (...args: MulterMethodArgs[T]) => RequestHandler
  )(...args);

  return (req, res, next) => {
    multerUpload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json(responseError(400, { details: err.message }));
      } else if (err) {
        return res
          .status(500)
          .json(responseError(500, { details: err.message }));
      }
      next();
    });
  };
};

export default uploadMiddleware;
