import { match } from 'src/libs/utils';
import { logger } from 'src/plugins/winston';

import { Prisma } from '@prisma/client';
import { LambdaError, ServerError, PrismaError } from 'src/libs/errors';

import { APIGatewayEvent } from 'aws-lambda';
import {
  ClientErrorCodes,
  ServerErrorCodes,
  ErrorCode,
} from 'src/libs/errors/types';

/**
 * Handles errors comming from API calls, and logs out the metadata
 *
 * Prisma error reference page: https://www.prisma.io/docs/reference/api-reference/error-reference
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
  logger.error({ error, event });

  const matchedError = match(error)
    .on(
      (error: Error) => error.name === 'Lambda Error',
      () => new LambdaError(error.message, statusCode)
    )
    .on(
      (error: Error) => error instanceof Prisma.PrismaClientKnownRequestError,
      () => new PrismaError(error.message, ClientErrorCodes.BAD_REQUEST)
    )
    .on(
      (error: Error) => error instanceof Prisma.PrismaClientUnknownRequestError,
      () => new PrismaError(error.message, ClientErrorCodes.NOT_ACCESSIBLE)
    )
    .on(
      (error: Error) => error instanceof Prisma.PrismaClientRustPanicError,
      () => new PrismaError(error.message, ClientErrorCodes.REQUEST_TIMEOUT)
    )
    .on(
      (error: Error) => error instanceof Prisma.PrismaClientInitializationError,
      () => new PrismaError(error.message, ClientErrorCodes.FORBIDDEN)
    )
    .otherwise(
      () =>
        new ServerError(
          'Internal Server Error',
          ServerErrorCodes.INTERNAL_SERVER_ERROR
        )
    );

  return {
    statusCode: matchedError.statusCode,
    body: JSON.stringify({
      error: matchedError.message,
    }),
  };
};

export default errorHandler;
