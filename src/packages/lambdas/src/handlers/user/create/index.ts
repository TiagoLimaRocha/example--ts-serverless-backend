import * as UserRepository from 'src/repositories/user';
import * as AuthRepository from 'src/repositories/auth';

import { errorHandler, response, getData } from 'src/libs/utils';

import { User } from 'src/repositories/user/types';
import { SuccessCodes } from 'src/libs/utils/response/types';
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

import { LambdaError } from 'src/libs/errors';

export const createUser = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { body } = event;

    const userData = getData<User>(body);

    if (!body) {
      throw new LambdaError('Missing request body');
    }

    userData.token = AuthRepository.createToken({ username: userData.username });

    const result = await UserRepository.create(userData);

    return response(SuccessCodes.CREATED, {
      user: result,
    });
  } catch (error) {
    return errorHandler(error, event);
  }
};
