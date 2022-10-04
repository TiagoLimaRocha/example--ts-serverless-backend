import * as UserRepository from 'src/repository/user';
import { LambdaError } from 'src/libs/errors';

import { errorHandler, response, match, isUserId } from 'src/libs/utils';

import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { ClientErrorCodes } from 'src/libs/errors/types';
import { SuccessCodes } from 'src/libs/utils/response/types';
import { UserPathParameters } from 'src/handlers/user/types';

export const deleteUserById = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const pathParameters = event?.pathParameters || {};

    const result = match(pathParameters)
      .on(
        (pathParameters: UserPathParameters) => isUserId(pathParameters),
        async () => {
          const result = await UserRepository.deleteById(
            parseInt(pathParameters.userId)
          );

          return result;
        }
      )
      .otherwise(() => {
        throw new LambdaError(
          'Missing path parameters',
          ClientErrorCodes.UNPROCESSABLE_ENTITY
        );
      });

    return response(SuccessCodes.OK, {
      user: result,
    });
  } catch (error) {
    return errorHandler(error, event);
  }
};