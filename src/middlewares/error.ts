import { Request, Response } from "express";
import { ErrorHandler as Error, responseError } from "@/utils";

export const errorHandler = (err: Error, req: Request, res: Response) => {
  const status = err.code || 500;
  const details = err.message || "Internal server error";

  console.log("statusssssssssssssssssssssssssssssssssssssssssssssssssssssssss", status);
  

  res.status(200).json(responseError(status, { details }));
};
