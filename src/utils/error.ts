const errorStatusCodes = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
};

/**
 * Error Handler
 * 
 * @example
 * 
 * const { ErrorHandler } = require('./error');
 * 
 * throw new ErrorHandler(400, 'Invalid request', {
 *   details: 'Please provide valid credentials',
 *   
 * })
 })
 * @class ErrorHandler - Error Handler
 * @extends {Error} - Error
 * @returns {Object} - Error
 */

export class ErrorHandler extends Error {
  code: 400 | 401 | 403 | 404 | 500;
  message: string;
  details?: unknown;
  success: boolean;
  constructor(code: 400 | 401 | 403 | 404 | 500, details?: unknown) {
    super();
    this.code = code;
    this.message = errorStatusCodes[code];
    this.details = details;
    this.success = false;
  }
}
