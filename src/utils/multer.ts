import multer from "multer";
import path from "path";
import type { IMulterOptions } from "@/types";

export function upload(options: IMulterOptions) {
  const multerInstance = multer({
    storage: multer.memoryStorage(),
    fileFilter: async (req, file, cb) => {
      const filetypes = options.fileTypes;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      if (mimetype && extname) {
        cb(null, true);
      } else {
        cb(new Error("File type not allowed"));
      }
    },
    limits: { fileSize: options.fileSize },
  });

  return multerInstance;
}
