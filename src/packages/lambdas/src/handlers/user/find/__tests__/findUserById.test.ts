import { findUserById } from 'src/handlers/user/find';

import { mockedPrisma } from 'src/plugins/prisma/__mocks__/client.mock';
import { mockClear } from 'jest-mock-extended';

import { MOCK_USER } from 'src/repositories/user/__mocks__/UserRepository.mock';
import {
  MOCK_EVENT,
  MOCK_RESPONSE,
} from 'src/handlers/__mocks__/handlers.mock';
import { MOCK_ERROR_HANDLER_RETURN_VALUE } from 'src/libs/utils/errorHandler/__mocks__/errorHandler.mock';

import { SuccessCodes } from 'src/libs/utils/response/types';
import { ClientErrorCodes } from 'src/libs/errors/types';

describe('findUserById', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    mockClear(mockedPrisma);
  });

  test('should fetch an existing user by its uid', async () => {
    mockedPrisma.user.findUnique.mockResolvedValue(MOCK_USER);

    MOCK_EVENT.pathParameters = { userId: MOCK_USER.id.toString() };

    MOCK_RESPONSE.body = JSON.stringify({ user: MOCK_USER });
    MOCK_RESPONSE.statusCode = SuccessCodes.OK;

    await expect(findUserById(MOCK_EVENT)).resolves.toEqual(
      MOCK_RESPONSE
    );
  });

  test('should catch an error when trying to fetch a non-existant uid', async () => {
    mockedPrisma.user.findUnique.mockRejectedValue(new Error());

    MOCK_EVENT.pathParameters = { userId: MOCK_USER.id.toString() };

    await expect(findUserById(MOCK_EVENT)).resolves.toEqual(
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

    await expect(findUserById(MOCK_EVENT)).resolves.toEqual(
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

    await expect(findUserById(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });

  test('should catch an error when user not found', async () => {
    mockedPrisma.user.findUnique.mockResolvedValue(null);

    MOCK_EVENT.pathParameters = { userId: MOCK_USER.id.toString() };

    MOCK_ERROR_HANDLER_RETURN_VALUE.body = JSON.stringify({
      error: 'User not found',
    });
    MOCK_ERROR_HANDLER_RETURN_VALUE.statusCode = ClientErrorCodes.NOT_FOUND;

    await expect(findUserById(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });
});
