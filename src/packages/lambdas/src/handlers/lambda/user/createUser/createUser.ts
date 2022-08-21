import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { UserRepository } from 'src/repository';
import { User } from 'src/repository/user/types';
import { errorHandler } from 'src/libs/utils';

const createUser = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const payload: User = JSON.parse(event.body);

    const result = await UserRepository.create(payload);

    return {
      statusCode: 200,
      body: JSON.stringify({
        user: result,
      }),
    };
  } catch (error) {
    return errorHandler(error, event);
  }
};

export default createUser;
