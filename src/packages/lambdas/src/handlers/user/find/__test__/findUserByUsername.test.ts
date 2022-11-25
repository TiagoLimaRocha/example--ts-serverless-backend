import { mockedUserRepository } from 'src/repository/user/__mocks__/UserRepository.mock';

import { MOCK_USER } from 'src/repository/user/__mocks__/UserRepository.mock';
import { MOCK_EVENT, MOCK_RESPONSE } from 'src/handlers/__mocks__';
import { MOCK_ERROR_HANDLER_RETURN_VALUE } from 'src/libs/utils/errorHandler/__mocks__/';

import { LambdaError } from 'src/libs/errors';

import { SuccessCodes } from 'src/libs/utils/response/types';
import { ClientErrorCodes } from 'src/libs/errors/types';
import { UserPathParameters } from 'src/handlers/user/types';
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

import { errorHandler, response, match, isUsername } from 'src/libs/utils';

const mockedFindUserByUsername: jest.Mock = jest.fn();

describe('findUserByUsername', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    MOCK_EVENT.body = JSON.stringify(MOCK_USER);

    mockedFindUserByUsername.mockImplementation(
      async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
        try {
          const pathParameters = event?.pathParameters || {};

          const result = await match(pathParameters)
            .on(
              (pathParameters: UserPathParameters) =>
                isUsername(pathParameters),
              async () => {
                const result = await mockedUserRepository.get(
                  parseInt(pathParameters.username)
                );

                return result;
              }
            )
            .otherwise(() => {
              throw new LambdaError(
                'Missing path parameters',
                ClientErrorCodes.UNPROCESSABLE_ENTITY
              );
            });

          if (!result) {
            throw new LambdaError('User not found', ClientErrorCodes.NOT_FOUND);
          }

          return response(SuccessCodes.OK, {
            user: result,
          });
        } catch (error) {
          return errorHandler(error, event);
        }
      }
    );
  });

  test('should delete an existing user by its username', async () => {
    mockedUserRepository.get.mockResolvedValue(MOCK_USER);

    MOCK_EVENT.pathParameters = { username: MOCK_USER.username };

    MOCK_RESPONSE.body = JSON.stringify({ user: MOCK_USER });
    MOCK_RESPONSE.statusCode = SuccessCodes.OK;

    await expect(mockedFindUserByUsername(MOCK_EVENT)).resolves.toEqual(
      MOCK_RESPONSE
    );
  });

  test('should catch an error when trying to delete a non-existant username', async () => {
    mockedUserRepository.get.mockRejectedValue(new Error());

    MOCK_EVENT.pathParameters = { username: MOCK_USER.username };

    await expect(mockedFindUserByUsername(MOCK_EVENT)).resolves.toEqual(
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

    await expect(mockedFindUserByUsername(MOCK_EVENT)).resolves.toEqual(
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

    await expect(mockedFindUserByUsername(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });

  test('should catch an error when user not found', async () => {
    mockedUserRepository.get.mockResolvedValue(null);

    MOCK_EVENT.pathParameters = { username: MOCK_USER.username };

    MOCK_ERROR_HANDLER_RETURN_VALUE.body = JSON.stringify({
      error: 'User not found',
    });
    MOCK_ERROR_HANDLER_RETURN_VALUE.statusCode = ClientErrorCodes.NOT_FOUND;

    await expect(mockedFindUserByUsername(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });
});
