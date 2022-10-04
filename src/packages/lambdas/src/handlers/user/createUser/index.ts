import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import * as UserRepository from 'src/repository/user';
import { errorHandler, response, getData } from 'src/libs/utils';

import { User } from 'src/repository/user/types';
import { SuccessCodes } from 'src/libs/utils/response/types';

export const createUser = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { body } = event;

    const userData: User = getData(body);

    const result = await UserRepository.create(userData);

    return response(SuccessCodes.CREATED, {
      user: result,
    });
  } catch (error) {
    return errorHandler(error, event);
  }
};
