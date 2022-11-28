import * as UserRepository from 'src/repositories/user';

import {
  errorHandler,
  response,
  getData,
  match,
  isUserId,
} from 'src/libs/utils';

import { LambdaError } from 'src/libs/errors';

import { User } from 'src/repositories/user/types';
import { SuccessCodes } from 'src/libs/utils/response/types';
import { ClientErrorCodes } from 'src/libs/errors/types';
import { UserPathParameters } from 'src/handlers/user/types';
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

export const updateUserById = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { body, pathParameters } = event;

    const identifier = await match(pathParameters)
      .on(
        (pathParameters: UserPathParameters) => isUserId(pathParameters),
        () => parseInt(pathParameters.userId)
      )
      .otherwise(() => {
        throw new LambdaError(
          'Missing path parameters',
          ClientErrorCodes.UNPROCESSABLE_ENTITY
        );
      });

    const userData: User = getData(body);

    const result = await UserRepository.update(userData, identifier);

    return response(SuccessCodes.OK, {
      user: result,
    });
  } catch (error) {
    return errorHandler(error, event);
  }
};
