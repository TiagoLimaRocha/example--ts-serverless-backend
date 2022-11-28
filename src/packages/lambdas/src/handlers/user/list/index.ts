import * as UserRepository from 'src/repositories/user';
import { errorHandler, response } from 'src/libs/utils';

import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { User } from 'src/repositories/user/types';
import { SuccessCodes } from 'src/libs/utils/response/types';

export const listUsers = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { offset, pageSize } = event?.queryStringParameters || {};

    const args = [];

    if (offset && pageSize) {
      args.push(parseInt(pageSize));
      args.push(parseInt(offset));
    }

    const result: User[] = await UserRepository.list(...args);

    return response(SuccessCodes.OK, {
      users: result,
    });
  } catch (error) {
    return errorHandler(error, event);
  }
};
