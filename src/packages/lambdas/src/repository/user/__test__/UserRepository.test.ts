import * as UserRepository from 'src/repository/user';
import prismaMock from 'src/plugins/prisma/singleton';

import {
  MOCK_USERNAME,
  MOCK_USER_ID,
  MOCK_USER,
  MOCK_USER_LIST,
} from 'src/repository/user/__mocks__';

const RANDOM_ID = 9999;

describe('UserRepository', () => {
  describe('create', () => {
    it('should create a new user', async () => {
      const user = await UserRepository.getById(MOCK_USER.id);

      if (user) {
        await UserRepository.deleteById(MOCK_USER.id);
      }

      const newUser = await UserRepository.create(MOCK_USER);

      expect(newUser).toEqual({ ...MOCK_USER, createdAt: newUser.createdAt });
    });

    it('should NOT create a new user if user ID already exists', async () => {
      await expect(UserRepository.create(MOCK_USER)).rejects.toThrow();
    });

    it('should NOT create a new user if email already exists', async () => {
      MOCK_USER.id = RANDOM_ID;

      await expect(UserRepository.create(MOCK_USER)).rejects.toThrow();
    });

    it('should NOT create a new user if user name already exists', async () => {
      MOCK_USER.id = RANDOM_ID;
      MOCK_USER.email = 'aValidEmail@email.com';

      await expect(UserRepository.create(MOCK_USER)).rejects.toThrow();
    });
  });
});
