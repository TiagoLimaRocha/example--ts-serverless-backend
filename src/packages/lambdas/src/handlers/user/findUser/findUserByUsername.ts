import * as UserRepository from 'src/repository/user';
import { LambdaError } from 'src/libs/errors';

import { errorHandler, response, match, isUsername } from 'src/libs/utils';

import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { ClientErrorCodes } from 'src/libs/errors/types';
import { SuccessCodes } from 'src/libs/utils/response/types';
import { UserPathParameters } from 'src/handlers/user/types';

export const findUserByUsername = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const pathParameters = event?.pathParameters || {};

    const result = await match(pathParameters)
      .on(
        (pathParameters: UserPathParameters) => isUsername(pathParameters),
        async () => {
          const result = await UserRepository.getByName(
            pathParameters.username
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

    if (!result) {
      throw new LambdaError('User not found', ClientErrorCodes.NOT_FOUND);
    }

    return response(SuccessCodes.OK, {
      user: result,
    });
  } catch (error) {
    return errorHandler(error, event);
  }
};
