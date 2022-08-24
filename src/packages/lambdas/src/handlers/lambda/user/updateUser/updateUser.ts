import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { UserRepository } from 'src/repository';
import { errorHandler, response } from 'src/libs/utils';

import { User } from 'src/repository/user/types';
import { SuccessCodes } from 'src/libs/utils/response/types';

const updateUser = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userData: User = JSON.parse(event.body);

    const result = await UserRepository.update(userData);

    return response(SuccessCodes.OK, {
      user: result,
    });
  } catch (error) {
    return errorHandler(error, event);
  }
};

export default updateUser;
