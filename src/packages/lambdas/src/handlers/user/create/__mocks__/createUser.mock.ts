import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { errorHandler, response, getData } from 'src/libs/utils';

import { User } from 'src/repository/user/types';
import { SuccessCodes } from 'src/libs/utils/response/types';

import { mockedUserRepository } from 'src/repository/user/__mocks__/UserRepository.mock';

export const mockedCreateUser = jest
  .fn()
  .mockImplementation(
    async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
      try {
        const { body } = event;

        const userData: User = getData(body);

        const result = await mockedUserRepository.create(userData);

        return response(SuccessCodes.CREATED, {
          user: result,
        });
      } catch (error) {
        return errorHandler(error, event);
      }
    }
  );
