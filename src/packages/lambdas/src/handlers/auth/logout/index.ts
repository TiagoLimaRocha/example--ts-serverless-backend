import * as AuthRepository from 'src/repositories/auth';
import * as UserRepository from 'src/repositories/user';

import { errorHandler, response, getData } from 'src/libs/utils';

import { UserLogoutDetails } from 'src/repositories/user/types';
import { SuccessCodes } from 'src/libs/utils/response/types';
import { ClientErrorCodes } from 'src/libs/errors/types';
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

import { LambdaError } from 'src/libs/errors';

export const logout = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { body } = event || {};

    if (!body) {
      throw new LambdaError('Missing request body');
    }

    const { username } = getData<UserLogoutDetails>(body) || {};

    const user = await UserRepository.get(username);

    if (!user) {
      throw new LambdaError('User not found', ClientErrorCodes.NOT_FOUND);
    }

    await AuthRepository.revokeToken(user.token);

    return response(SuccessCodes.OK, {});
  } catch (error) {
    return errorHandler(error, event);
  }
};
