import { Prisma } from '@prisma/client';
import { match } from 'src/libs/utils';
import { LambdaError, ServerError } from 'src/libs/errors';
import {
  ClientErrorCodes,
  ServerErrorCodes,
  ErrorCode,
} from 'src/libs/errors/types';

/**
 * Handles errors comming from API calls
 * 
 * prisma error reference page: https://www.prisma.io/docs/reference/api-reference/error-reference
 * 
 * @param error The produced error object
 * @param statusCode The error status code
 * @returns The appropriate error object
 */
const errorHandler = (error: Error, statusCode?: ErrorCode) => {
  if (error.name === 'LambdaError') {
    return;
  }

  return match(error)
    .on(
      (error: Error) => error.name === 'LambdaError',
      () => new LambdaError(error.message, statusCode)
    )
    .on(
      (error: Error) => error instanceof Prisma.PrismaClientKnownRequestError,
      () => new ServerError(error.message, ClientErrorCodes.BAD_REQUEST)
    )
    .on(
      (error: Error) => error instanceof Prisma.PrismaClientUnknownRequestError,
      () => new ServerError(error.message, ClientErrorCodes.NOT_FOUND)
    )
    .on(
      (error: Error) => error instanceof Prisma.PrismaClientRustPanicError,
      () => new ServerError(error.message, ClientErrorCodes.BAD_REQUEST)
    )
    .on(
      (error: Error) => error instanceof Prisma.PrismaClientInitializationError,
      () => new ServerError(error.message, ClientErrorCodes.FORBIDDEN)
    )
    .otherwise(
      () =>
        new ServerError(
          'Internal Server Error',
          ServerErrorCodes.INTERNAL_SERVER_ERROR
        )
    );
};

export default errorHandler;
