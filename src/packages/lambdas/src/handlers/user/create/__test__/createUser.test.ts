import { mockedUserRepository } from 'src/repository/user/__mocks__/UserRepository.mock';

import { MOCK_USER } from 'src/repository/user/__mocks__/UserRepository.mock';
import { MOCK_EVENT, MOCK_RESPONSE } from 'src/handlers/__mocks__';
import { MOCK_ERROR_HANDLER_RETURN_VALUE } from 'src/libs/utils/errorHandler/__mocks__/';

import { SuccessCodes } from 'src/libs/utils/response/types';

import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { errorHandler, response, getData } from 'src/libs/utils';

import { User } from 'src/repository/user/types';

const mockedCreateUser: jest.Mock = jest.fn();

describe('createUser', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    MOCK_EVENT.body = JSON.stringify(MOCK_USER);

    mockedCreateUser.mockImplementation(
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
  });

  test('should create a new user', async () => {
    mockedUserRepository.create.mockResolvedValue(MOCK_USER);

    MOCK_RESPONSE.body = JSON.stringify({ user: MOCK_USER });
    MOCK_RESPONSE.statusCode = SuccessCodes.CREATED;

    await expect(mockedCreateUser(MOCK_EVENT)).resolves.toEqual(MOCK_RESPONSE);
  });

  test('should catch an error when trying to create a new user if uid already exists', async () => {
    mockedUserRepository.create.mockRejectedValue(new Error());

    await expect(mockedCreateUser(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });

  test('should catch an error when trying to create a new user if email already exists', async () => {
    mockedUserRepository.create.mockRejectedValue(new Error());

    await expect(mockedCreateUser(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });

  test('should catch an error when trying to create a new user if username already exists', async () => {
    mockedUserRepository.create.mockRejectedValue(new Error());

    await expect(mockedCreateUser(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });
});
