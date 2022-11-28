import * as UserRepository from 'src/repositories/user';

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

    const userData: User = getData(body);

    if (!body) {
      throw new LambdaError('Missing request body');
    }

    const result = await UserRepository.create(userData);

    return response(SuccessCodes.CREATED, {
      user: result,
    });
  } catch (error) {
    return errorHandler(error, event);
  }
};
