import { match } from 'src/libs/utils';
import { logger } from 'src/plugins/winston';

import { Prisma } from '@prisma/client';
import { LambdaError, ServerError } from 'src/libs/errors';

import { APIGatewayEvent } from 'aws-lambda';
import {
  ClientErrorCodes,
  ServerErrorCodes,
  ErrorCode,
} from 'src/libs/errors/types';

/**
 * Handles errors comming from API calls, and logs out the metadata
 *
 * prisma error reference page: https://www.prisma.io/docs/reference/api-reference/error-reference
 *
 * @param error The produced error object
 * @param statusCode The error status code
 * @returns The appropriate error object
 */
const errorHandler = (
  error: Error,
  event: APIGatewayEvent,
  statusCode?: ErrorCode
) => {
  logger.error(error.name, { error, event });

  if (error.name === 'LambdaError') {
    return;
  }

  const res = match(error)
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

  return {
    statusCode: res.statusCode,
    body: JSON.stringify({
      error: res,
    }),
  };
};

export default errorHandler;
