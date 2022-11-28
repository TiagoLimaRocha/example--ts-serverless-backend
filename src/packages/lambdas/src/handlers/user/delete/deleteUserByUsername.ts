import * as UserRepository from 'src/repositories/user';
import { LambdaError } from 'src/libs/errors';

import { errorHandler, response, isUsername } from 'src/libs/utils';

import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { ClientErrorCodes } from 'src/libs/errors/types';
import { SuccessCodes } from 'src/libs/utils/response/types';

export const deleteUserByUsername = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { pathParameters } = event || {};

    if (!pathParameters || !isUsername(pathParameters)) {
      throw new LambdaError(
        'Missing path parameters',
        ClientErrorCodes.UNPROCESSABLE_ENTITY
      );
    }

    const result = await UserRepository.__delete(pathParameters.username);

    return response(SuccessCodes.OK, {
      user: result,
    });
  } catch (error) {
    return errorHandler(error, event);
  }
};
