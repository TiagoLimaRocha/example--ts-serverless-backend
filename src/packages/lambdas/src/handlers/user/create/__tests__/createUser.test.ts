import { createUser } from 'src/handlers/user/create';

import { mockedPrisma } from 'src/plugins/prisma/__mocks__/client.mock';
import { mockClear } from 'jest-mock-extended';

import { MOCK_USER } from 'src/repositories/user/__mocks__/UserRepository.mock';
import {
  MOCK_EVENT,
  MOCK_RESPONSE,
} from 'src/handlers/__mocks__/handlers.mock';
import { MOCK_ERROR_HANDLER_RETURN_VALUE } from 'src/libs/utils/errorHandler/__mocks__/errorHandler.mock';

import { SuccessCodes } from 'src/libs/utils/response/types';

describe('createUser', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    mockClear(mockedPrisma);

    MOCK_EVENT.body = JSON.stringify(MOCK_USER);
  });

  test('should create a new user', async () => {
    mockedPrisma.user.create.mockResolvedValue(MOCK_USER);

    MOCK_RESPONSE.body = JSON.stringify({ user: MOCK_USER });
    MOCK_RESPONSE.statusCode = SuccessCodes.CREATED;

    MOCK_EVENT.body = JSON.stringify(MOCK_USER);

    await expect(createUser(MOCK_EVENT)).resolves.toEqual(MOCK_RESPONSE);
  });

  test('should catch an error if body is missing from the request', async () => {
    MOCK_EVENT.body = null;

    await expect(createUser(MOCK_EVENT)).resolves.toEqual(MOCK_ERROR_HANDLER_RETURN_VALUE);
  });

  test('should catch an error when trying to create a new user if uid already exists', async () => {
    mockedPrisma.user.create.mockRejectedValue(new Error());

    await expect(createUser(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });

  test('should catch an error when trying to create a new user if email already exists', async () => {
    mockedPrisma.user.create.mockRejectedValue(new Error());

    await expect(createUser(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });

  test('should catch an error when trying to create a new user if username already exists', async () => {
    mockedPrisma.user.create.mockRejectedValue(new Error());

    await expect(createUser(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });
});
