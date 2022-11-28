import * as UserRepository from 'src/repositories/user';

import { mockedPrisma } from 'src/plugins/prisma/__mocks__/client.mock';

import {
  MOCK_USER_LIST,
  MOCK_USER,
} from 'src/repositories/user/__mocks__/UserRepository.mock';

const ARBITRARY_ID = 9999;

describe('mockedUserRepository', () => {
  describe('create', () => {
    test('should create a new user', async () => {
      mockedPrisma.user.create.mockResolvedValue(MOCK_USER);

      await expect(UserRepository.create(MOCK_USER)).resolves.toEqual(
        MOCK_USER
      );
    });

    test('should NOT create a new user if uid already exists', async () => {
      mockedPrisma.user.create.mockRejectedValue(new Error());

      await expect(UserRepository.create(MOCK_USER)).rejects.toThrow();
    });

    test('should NOT create a new user if email already exists', async () => {
      mockedPrisma.user.create.mockRejectedValue(new Error());

      MOCK_USER.id = ARBITRARY_ID;

      await expect(UserRepository.create(MOCK_USER)).rejects.toThrow();
    });

    test('should NOT create a new user if username already exists', async () => {
      mockedPrisma.user.create.mockRejectedValue(new Error());

      MOCK_USER.id = ARBITRARY_ID;
      MOCK_USER.email = 'aValidEmail@email.com';

      await expect(UserRepository.create(MOCK_USER)).rejects.toThrow();
    });
  });

  describe('get', () => {
    test('should fetch a user by uid', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(MOCK_USER);

      await expect(UserRepository.get(MOCK_USER.id)).resolves.toEqual(
        MOCK_USER
      );
    });

    test('should fetch a user by username', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(MOCK_USER);

      await expect(UserRepository.get(MOCK_USER.username)).resolves.toEqual(
        MOCK_USER
      );
    });

    test('should return null if user uid does not exist', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(null);

      await expect(UserRepository.get(MOCK_USER.id)).resolves.toEqual(null);
    });

    test('should return null if user name does not exist', async () => {
      mockedPrisma.user.findUnique.mockResolvedValue(null);

      await expect(UserRepository.get(MOCK_USER.username)).resolves.toEqual(
        null
      );
    });
  });

  describe('list', () => {
    test('should fetch the first 10 users', async () => {
      mockedPrisma.user.findMany.mockResolvedValue(MOCK_USER_LIST);

      await expect(UserRepository.list()).resolves.toEqual(MOCK_USER_LIST);
    });

    test('should return an empty list when no users are found', async () => {
      mockedPrisma.user.findMany.mockResolvedValue([]);

      await expect(UserRepository.list()).resolves.toEqual([]);
    });
  });

  describe('update', () => {
    test('should update a user given username as identifier', async () => {
      mockedPrisma.user.update.mockResolvedValue(MOCK_USER);

      await expect(
        UserRepository.update(MOCK_USER, MOCK_USER.id)
      ).resolves.toEqual(MOCK_USER);
    });

    test('should update a user given uid as identifier', async () => {
      mockedPrisma.user.update.mockResolvedValue(MOCK_USER);

      await expect(
        UserRepository.update(MOCK_USER, MOCK_USER.username)
      ).resolves.toEqual(MOCK_USER);
    });

    test('should throw if uid is not found', async () => {
      mockedPrisma.user.update.mockRejectedValue(new Error());

      await expect(
        UserRepository.update(MOCK_USER, MOCK_USER.id)
      ).rejects.toThrow();
    });

    test('should throw if username is not found', async () => {
      mockedPrisma.user.update.mockRejectedValue(new Error());

      await expect(
        UserRepository.update(MOCK_USER, MOCK_USER.username)
      ).rejects.toThrow();
    });
  });

  describe('delete', () => {
    test('should delete a user given username as identifier', async () => {
      mockedPrisma.user.delete.mockResolvedValue(MOCK_USER);

      await expect(UserRepository.__delete(MOCK_USER.id)).resolves.toEqual(
        MOCK_USER
      );
    });

    test('should delete a user given uid as identifier', async () => {
      mockedPrisma.user.delete.mockResolvedValue(MOCK_USER);

      await expect(
        UserRepository.__delete(MOCK_USER.username)
      ).resolves.toEqual(MOCK_USER);
    });

    test('should throw if uid is not found', async () => {
      mockedPrisma.user.delete.mockRejectedValue(new Error());

      await expect(UserRepository.__delete(MOCK_USER.id)).rejects.toThrow();
    });

    test('should throw if username is not found', async () => {
      mockedPrisma.user.delete.mockRejectedValue(new Error());

      await expect(
        UserRepository.__delete(MOCK_USER.username)
      ).rejects.toThrow();
    });
  });
});
