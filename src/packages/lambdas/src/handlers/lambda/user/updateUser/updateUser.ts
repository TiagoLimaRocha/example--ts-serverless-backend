import { UserRepository } from 'src/repository';

import {
  errorHandler,
  response,
  getData,
  match,
  isUsername,
  isUserId,
} from 'src/libs/utils';

import { LambdaError } from 'src/libs/errors';

import { User } from 'src/repository/user/types';
import { SuccessCodes } from 'src/libs/utils/response/types';
import { ClientErrorCodes } from 'src/libs/errors/types';
import { UserPathParameters } from 'src/handlers/lambda/user/types';
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

const updateUser = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { body, pathParameters } = event;

    const identifier = match(pathParameters)
      .on(
        (pathParameters: UserPathParameters) => isUsername(pathParameters),
        () => pathParameters.username
      )
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

export default updateUser;
