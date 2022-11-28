import * as UserRepository from 'src/repositories/user';

import { errorHandler, response, getData, isUsername } from 'src/libs/utils';

import { LambdaError } from 'src/libs/errors';

import { User } from 'src/repositories/user/types';
import { SuccessCodes } from 'src/libs/utils/response/types';
import { ClientErrorCodes } from 'src/libs/errors/types';
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

export const updateUserByUsername = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { body, pathParameters } = event;

    if (!body) {
      throw new LambdaError(
        'Missing request body',
        ClientErrorCodes.UNPROCESSABLE_ENTITY
      );
    }

    if (!pathParameters || !isUsername(pathParameters)) {
      throw new LambdaError(
        'Missing path parameters',
        ClientErrorCodes.UNPROCESSABLE_ENTITY
      );
    }

    const userData: User = getData(body);

    const result = await UserRepository.update(
      userData,
      pathParameters.username
    );

    return response(SuccessCodes.OK, {
      user: result,
    });
  } catch (error) {
    return errorHandler(error, event);
  }
};
