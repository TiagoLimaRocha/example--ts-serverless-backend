import { UserRepository } from 'src/repository';
import { prismaMock } from 'src/plugins/prisma';

import {
  MOCK_USERNAME,
  MOCK_USER_ID,
  MOCK_USER,
  MOCK_USER_LIST,
} from 'src/repository/user/__mocks__';

describe('UserRepository', () => {
  it('should create a new user', async () => {
    // @ts-ignore
    prismaMock.user.create.mockResolvedValue(MOCK_USER);

    await expect(UserRepository.create(MOCK_USER)).resolves.toEqual({
      id: 1,
      ...MOCK_USER,
    });
  });
});
