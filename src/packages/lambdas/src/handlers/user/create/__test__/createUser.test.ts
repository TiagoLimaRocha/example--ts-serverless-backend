import {
  mockedUserRepository,
  MOCK_USER,
} from 'src/repository/user/__mocks__/UserRepository.mock';
import { MOCK_EVENT, MOCK_RESPONSE } from 'src/handlers/__mocks__/handler.mock';

import { SuccessCodes } from 'src/libs/utils/response/types';

describe('Create User Lambda', () => {
  test('should create a new user', async () => {
    const { mockedCreateUser } = await import(
      'src/handlers/user/create/__mocks__/createUser.mock'
    );

    mockedUserRepository.create.mockResolvedValue(MOCK_USER);

    MOCK_EVENT.body = JSON.stringify(MOCK_USER);
    MOCK_RESPONSE.body = JSON.stringify({ user: MOCK_USER });
    MOCK_RESPONSE.statusCode = SuccessCodes.CREATED;

    await expect(mockedCreateUser(MOCK_EVENT)).resolves.toEqual(MOCK_RESPONSE);
  });
});
