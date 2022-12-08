import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ClientErrorCodes, ServerErrorCodes } from 'src/libs/errors/types';

import { validateToken } from 'src/repositories/auth';

const PREFIX = 'bearer';

export const authorise = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let { authorization } = request.headers || {};

    if (!authorization) {
      return response
        .status(ClientErrorCodes.UNAUTHORIZED)
        .json({ message: 'Invalid token' });
    }

    const jwt = (authorization as string).toLowerCase().startsWith(PREFIX)
      ? (authorization as string).slice(PREFIX.length).trim()
      : (authorization as string);

    const decoded = validateToken(jwt);

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      response
        .status(ClientErrorCodes.UNAUTHORIZED)
        .json({ message: 'Expired token' });

      return;
    }

    response
      .status(ServerErrorCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to authenticate user' });
  }
};
