import { mockedUserRepository } from 'src/repository/user/__mocks__/UserRepository.mock';

import { MOCK_USER } from 'src/repository/user/__mocks__/UserRepository.mock';
import { MOCK_EVENT, MOCK_RESPONSE } from 'src/handlers/__mocks__';
import { MOCK_ERROR_HANDLER_RETURN_VALUE } from 'src/libs/utils/errorHandler/__mocks__/';

import { LambdaError } from 'src/libs/errors';

import { SuccessCodes } from 'src/libs/utils/response/types';
import { ClientErrorCodes } from 'src/libs/errors/types';
import { UserPathParameters } from 'src/handlers/user/types';
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

import { errorHandler, response, match, isUserId } from 'src/libs/utils';

const mockedFindUserById: jest.Mock = jest.fn();

describe('findUserById', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    MOCK_EVENT.body = JSON.stringify(MOCK_USER);

    mockedFindUserById.mockImplementation(
      async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
        try {
          const pathParameters = event?.pathParameters || {};

          const result = await match(pathParameters)
            .on(
              (pathParameters: UserPathParameters) => isUserId(pathParameters),
              async () => {
                const result = await mockedUserRepository.get(
                  parseInt(pathParameters.userId)
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

  test('should fetch an existing user by its uid', async () => {
    mockedUserRepository.get.mockResolvedValue(MOCK_USER);

    MOCK_EVENT.pathParameters = { userId: MOCK_USER.id.toString() };

    MOCK_RESPONSE.body = JSON.stringify({ user: MOCK_USER });
    MOCK_RESPONSE.statusCode = SuccessCodes.OK;

    await expect(mockedFindUserById(MOCK_EVENT)).resolves.toEqual(
      MOCK_RESPONSE
    );
  });

  test('should catch an error when trying to fetch a non-existant uid', async () => {
    mockedUserRepository.get.mockRejectedValue(new Error());

    MOCK_EVENT.pathParameters = { userId: MOCK_USER.id.toString() };

    await expect(mockedFindUserById(MOCK_EVENT)).resolves.toEqual(
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

    await expect(mockedFindUserById(MOCK_EVENT)).resolves.toEqual(
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

    await expect(mockedFindUserById(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });

  test('should catch an error when user not found', async () => {
    mockedUserRepository.get.mockResolvedValue(null);

    MOCK_EVENT.pathParameters = { userId: MOCK_USER.id.toString() };

    MOCK_ERROR_HANDLER_RETURN_VALUE.body = JSON.stringify({
      error: 'User not found',
    });
    MOCK_ERROR_HANDLER_RETURN_VALUE.statusCode = ClientErrorCodes.NOT_FOUND;

    await expect(mockedFindUserById(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });
});
