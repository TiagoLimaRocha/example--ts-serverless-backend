import * as AuthRepository from 'src/repositories/auth';
import * as UserRepository from 'src/repositories/user';

import { errorHandler, response, getData } from 'src/libs/utils';

import { UserLoginDetails } from 'src/repositories/user/types';
import { SuccessCodes } from 'src/libs/utils/response/types';
import { ClientErrorCodes } from 'src/libs/errors/types';
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

import { LambdaError } from 'src/libs/errors';

export const login = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { body } = event || {};

    if (!body) {
      throw new LambdaError('Missing request body', ClientErrorCodes.BAD_REQUEST);
    }

    const { username, password } = getData<UserLoginDetails>(body) || {};

    const user = await UserRepository.get(username);

    if (!user) {
      throw new LambdaError('Invalid username', ClientErrorCodes.NOT_FOUND);
    }

    const hash = user.password;

    const isValidPassword = await AuthRepository.verifyPassword(password, hash);

    if (!isValidPassword) {
      throw new LambdaError('Invalid password', ClientErrorCodes.FORBIDDEN);
    }

    const token = AuthRepository.createToken({ username });
    await UserRepository.update({ ...user, token }, username);

    return response(SuccessCodes.OK, {});
  } catch (error) {
    return errorHandler(error, event);
  }
};
