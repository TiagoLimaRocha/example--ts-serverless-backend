import { UserRepository } from 'src/repository';
import { errorHandler, response, match } from 'src/libs/utils';

import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { User } from 'src/repository/user/types';
import { SuccessCodes } from 'src/libs/utils/response/types';
import { ClientErrorCodes } from 'src/libs/errors/types';
import { UserPathParametersList } from 'src/handlers/lambda/user/types';

const listUsers = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { offset, pageSize } = event?.pathParameters || {};

    const result: User[] = await UserRepository.list(
      parseInt(pageSize),
      parseInt(offset)
    );

    return response(SuccessCodes.OK, {
      users: result,
    });
  } catch (error) {
    return errorHandler(error, event);
  }
};

export default listUsers;
