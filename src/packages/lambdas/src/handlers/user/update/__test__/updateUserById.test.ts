import { mockedUserRepository } from 'src/repository/user/__mocks__/UserRepository.mock';

import { MOCK_USER } from 'src/repository/user/__mocks__/UserRepository.mock';
import { MOCK_EVENT, MOCK_RESPONSE } from 'src/handlers/__mocks__';
import { MOCK_ERROR_HANDLER_RETURN_VALUE } from 'src/libs/utils/errorHandler/__mocks__/';

import { LambdaError } from 'src/libs/errors';

import { SuccessCodes } from 'src/libs/utils/response/types';
import { ClientErrorCodes } from 'src/libs/errors/types';
import { UserPathParameters } from 'src/handlers/user/types';
import { User } from 'src/repository/user/types';
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

import { errorHandler, response, match, isUserId, getData } from 'src/libs/utils';

const mockedUpdateUserById: jest.Mock = jest.fn();

describe('updateUserById', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    MOCK_EVENT.body = JSON.stringify(MOCK_USER);

    mockedUpdateUserById.mockImplementation(
      async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
        try {
          const { body, pathParameters } = event;
      
          const identifier = await match(pathParameters)
            .on(
              (pathParameters: UserPathParameters) => isUserId(pathParameters),
              () => parseInt(pathParameters.userId)
            )
            .otherwise(() => {
              throw new LambdaError(
                'Missing path parameters',
                ClientErrorCodes.UNPROCESSABLE_ENTITY
              );
            });
      
          const userData: User = getData(body);
      
          const result = await mockedUserRepository.update(userData, identifier);
      
          return response(SuccessCodes.OK, {
            user: result,
          });
        } catch (error) {
          return errorHandler(error, event);
        }
      }
    );
  });

  test('should update an existing user by its uid', async () => {
    mockedUserRepository.update.mockResolvedValue(MOCK_USER);

    MOCK_EVENT.pathParameters = { userId: MOCK_USER.id.toString() };

    MOCK_RESPONSE.body = JSON.stringify({ user: MOCK_USER });
    MOCK_RESPONSE.statusCode = SuccessCodes.OK;

    await expect(mockedUpdateUserById(MOCK_EVENT)).resolves.toEqual(
      MOCK_RESPONSE
    );
  });

  test('should catch an error when trying to update a non-existant uid', async () => {
    mockedUserRepository.update.mockRejectedValue(new Error());

    MOCK_EVENT.pathParameters = { userId: MOCK_USER.id.toString() };

    await expect(mockedUpdateUserById(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });

  test('should catch an error when path parameters are missing', async () => {
    MOCK_EVENT.pathParameters = {};

    MOCK_ERROR_HANDLER_RETURN_VALUE.body = JSON.stringify({
      error: 'Missing path parameters',
    });
    MOCK_ERROR_HANDLER_RETURN_VALUE.statusCode =
      ClientErrorCodes.UNPROCESSABLE_ENTITY;

    await expect(mockedUpdateUserById(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });

  test('should catch an error when path parameters are wrong', async () => {
    MOCK_EVENT.pathParameters = { foo: 'bar' };

    MOCK_ERROR_HANDLER_RETURN_VALUE.body = JSON.stringify({
      error: 'Missing path parameters',
    });
    MOCK_ERROR_HANDLER_RETURN_VALUE.statusCode =
      ClientErrorCodes.UNPROCESSABLE_ENTITY;

    await expect(mockedUpdateUserById(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });
});
