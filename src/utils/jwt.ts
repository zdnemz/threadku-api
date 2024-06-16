import { env } from "@/config";
import { JWTSign } from "@/types";
import jwt from "jsonwebtoken";

/**
 * @example
 * const { jwtSign } = require('./jwt');
 * const { payload } = req.body;
 * 
 * const options = {
 *  expiresIn: '2h',
 * };
 * 
 * const token = jwtSign(payload, options);
 * 
 * console.log(token);
 * 
 * @function jwtSign - used to sign JWT
 */

export const jwtSign: JWTSign = (payload, options) => {
  const token = jwt.sign(payload, env.JWT_SECRET, options);

  return token;
};
