import { NextFunction, Request, Response } from "express";
import { SignOptions } from "jsonwebtoken";

/**
 * Interfaces
 *
 * @interface Decoded - decoded JWT payload
 * @interface JWTSign - JWT sign function
 * @interface RequestWithUser - extended express request with user data
 * @interface IMulterOptions - multer options
 * @interface IMulter - multer middleware function
 * @interface IFunction - express middleware function
 * 
 * Functions
 * @function jwtSign - JWT sign function
 * @function upload - multer middleware function
 **/

export type Decoded = {
  _id: string;
  username: string;
  email: string;
};

export type JWTSign = (
  payload: { _id: string; username: string; email: string },
  options?: SignOptions
) => string;

interface RequestWithUser extends Request {
  user?: Decoded;
}

export type IMulterOptions = {
  fileTypes: RegExp;
  fileSize: number;
};

export type IFunction = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => Promise<void | Response>;
