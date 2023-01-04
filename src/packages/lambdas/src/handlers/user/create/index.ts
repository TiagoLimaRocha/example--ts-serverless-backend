import * as UserRepository from 'src/repositories/user';
import * as AuthRepository from 'src/repositories/auth';

import { errorHandler, response, getData } from 'src/libs/utils';

import { User } from 'src/repositories/user/types';
import { SuccessCodes } from 'src/libs/utils/response/types';
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

import { LambdaError } from 'src/libs/errors';
import { ClientErrorCodes } from 'src/libs/errors/types';

export const createUser = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { body } = event;

    if (!body) {
      throw new LambdaError('Missing request body');
    }

    const userData = getData<User>(body);

    const passwordValidatorResult = AuthRepository.validatePassword(
      userData.password
    );

    if (!passwordValidatorResult.isValid) {
      throw new LambdaError(
        passwordValidatorResult.message,
        ClientErrorCodes.BAD_REQUEST
      );
    }

    const hashedPassword = await AuthRepository.hashPassword(userData.password);
    const authToken = AuthRepository.createToken({
      username: userData.username,
    });

    const result = await UserRepository.create({
      ...userData,
      token: authToken,
      password: hashedPassword,
    });

    return response(SuccessCodes.CREATED, {
      user: result,
    });
  } catch (error) {
    return errorHandler(error, event);
  }
};
