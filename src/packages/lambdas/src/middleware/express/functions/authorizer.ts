import * as AuthRepository from 'src/repositories/auth';
import * as UserRepository from 'src/repositories/user';

import { ClientErrorCodes, ServerErrorCodes } from 'src/libs/errors/types';
import { Request, Response, NextFunction } from 'express';

const PREFIX = 'bearer';

export const authorizer = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = request.headers || {};

    if (!authorization) {
      return response
        .status(ClientErrorCodes.UNAUTHORIZED)
        .json({ message: 'Missing token' });
    }

    const jwt = (authorization as string).toLowerCase().startsWith(PREFIX)
      ? (authorization as string).slice(PREFIX.length).trim()
      : (authorization as string);

    const decoded = AuthRepository.validateToken(jwt);

    if (!decoded.username) {
      return response
        .status(ClientErrorCodes.UNAUTHORIZED)
        .json({ message: 'Invalid token' });
    }

    if (!AuthRepository.isActiveToken(decoded)) {
      response
        .status(ClientErrorCodes.UNAUTHORIZED)
        .json({ message: 'Expired token' });

      return;
    }

    const header = 'authorization';
    const newToken = `Bearer ${AuthRepository.createToken(decoded)}`;

    response.setHeader(header, newToken);
    UserRepository.update({ token: newToken }, 'new_mock_username');

    next();
  } catch (error) {
    response
      .status(ServerErrorCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to authenticate user' });
  }
};
