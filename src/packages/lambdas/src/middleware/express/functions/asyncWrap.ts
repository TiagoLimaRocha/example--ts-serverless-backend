import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Enables async await usage within express route handlers
 *
 * @param fn The express request handler function
 * @returns A resolved promise or rejected promise with the error object
 */
export const asyncWrap =
  (fn: RequestHandler) =>
  (request: Request, response: Response, next: NextFunction) =>
    Promise.resolve(fn(request, response, next)).catch((err) => next(err));
