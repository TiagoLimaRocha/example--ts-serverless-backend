import { listUsers } from 'src/handlers/user/list';

import { mockedPrisma } from 'src/plugins/prisma/__mocks__/client.mock';
import { mockClear } from 'jest-mock-extended';

import { MOCK_USER_LIST } from 'src/repositories/user/__mocks__/UserRepository.mock';
import {
  MOCK_EVENT,
  MOCK_RESPONSE,
} from 'src/handlers/__mocks__/handlers.mock';
import { MOCK_ERROR_HANDLER_RETURN_VALUE } from 'src/libs/utils/errorHandler/__mocks__/errorHandler.mock';

import { SuccessCodes } from 'src/libs/utils/response/types';
import { ServerErrorCodes } from 'src/libs/errors/types';

import { LambdaError } from 'src/libs/errors/';

describe('listUsers', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    mockClear(mockedPrisma);

    MOCK_RESPONSE.body = JSON.stringify({ users: MOCK_USER_LIST });
    MOCK_RESPONSE.statusCode = SuccessCodes.OK;
  });

  test('should fetch the first 10 users when no parameters are provided', async () => {
    MOCK_EVENT.pathParameters = {
      offset: '0',
      pageSize: '10',
    };

    mockedPrisma.user.findMany.mockResolvedValue(MOCK_USER_LIST);

    await expect(listUsers(MOCK_EVENT)).resolves.toEqual(MOCK_RESPONSE);
  });

  test('should fetch the first 10 users when parameters are provided', async () => {
    MOCK_EVENT.pathParameters = null;

    mockedPrisma.user.findMany.mockResolvedValue(MOCK_USER_LIST);

    await expect(listUsers(MOCK_EVENT)).resolves.toEqual(MOCK_RESPONSE);
  });

  test('should return an empty list if no users are found', async () => {
    MOCK_RESPONSE.body = JSON.stringify({ users: [] });

    mockedPrisma.user.findMany.mockResolvedValue([]);

    await expect(listUsers(MOCK_EVENT)).resolves.toEqual(MOCK_RESPONSE);
  });

  test('should catch any exception', async () => {
    const errorMessage = 'Internal Server Error';

    mockedPrisma.user.findMany.mockRejectedValue(
      new LambdaError(errorMessage, ServerErrorCodes.INTERNAL_SERVER_ERROR)
    );

    await expect(listUsers(MOCK_EVENT)).resolves.toEqual(
      MOCK_ERROR_HANDLER_RETURN_VALUE
    );
  });
});
