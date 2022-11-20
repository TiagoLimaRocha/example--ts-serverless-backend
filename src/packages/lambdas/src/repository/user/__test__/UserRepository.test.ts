import { mockedUserRepository } from 'src/repository/user/__mocks__/UserRepository.mock';

import { MOCK_USER_LIST } from 'src/repository/user/__mocks__';

const ARBITRARY_ID = 9999;

const MOCK_USER = MOCK_USER_LIST[0];

describe('mockedUserRepository', () => {
  describe('create', () => {
    test('should create a new user', async () => {
      mockedUserRepository.create.mockResolvedValue(MOCK_USER);

      await expect(mockedUserRepository.create(MOCK_USER)).resolves.toEqual(
        MOCK_USER
      );
    });

    test('should NOT create a new user if uid already exists', async () => {
      mockedUserRepository.create.mockRejectedValue(new Error());

      await expect(mockedUserRepository.create(MOCK_USER)).rejects.toThrow();
    });

    test('should NOT create a new user if email already exists', async () => {
      mockedUserRepository.create.mockRejectedValue(new Error());

      MOCK_USER_LIST[0].id = ARBITRARY_ID;

      await expect(mockedUserRepository.create(MOCK_USER)).rejects.toThrow();
    });

    test('should NOT create a new user if user name already exists', async () => {
      mockedUserRepository.create.mockRejectedValue(new Error());

      MOCK_USER.id = ARBITRARY_ID;
      MOCK_USER.email = 'aValidEmail@email.com';

      await expect(mockedUserRepository.create(MOCK_USER)).rejects.toThrow();
    });
  });

  describe('get', () => {
    test('should fetch a user by uid', async () => {
      mockedUserRepository.get.mockResolvedValue(MOCK_USER);

      await expect(mockedUserRepository.get(MOCK_USER.id)).resolves.toEqual(
        MOCK_USER
      );
    });

    test('should fetch a user by username', async () => {
      mockedUserRepository.get.mockResolvedValue(MOCK_USER);

      await expect(
        mockedUserRepository.get(MOCK_USER.username)
      ).resolves.toEqual(MOCK_USER);
    });

    test('should return null if user uid does not exist', async () => {
      mockedUserRepository.get.mockResolvedValue(null);

      await expect(mockedUserRepository.get(MOCK_USER.id)).resolves.toEqual(
        null
      );
    });

    test('should return null if user name does not exist', async () => {
      mockedUserRepository.get.mockResolvedValue(null);

      await expect(
        mockedUserRepository.get(MOCK_USER.username)
      ).resolves.toEqual(null);
    });
  });

  describe('list', () => {
    test('should fetch the first 10 users', async () => {
      mockedUserRepository.list.mockResolvedValue(MOCK_USER_LIST);

      await expect(mockedUserRepository.list()).resolves.toEqual(
        MOCK_USER_LIST
      );
    });

    test('should return an empty list when no users are found', async () => {
      mockedUserRepository.list.mockResolvedValue([]);

      await expect(mockedUserRepository.list()).resolves.toEqual([]);
    });
  });

  describe('update', () => {
    test('should update a user given username as identifier', async () => {
      mockedUserRepository.update.mockResolvedValue(MOCK_USER);

      await expect(
        mockedUserRepository.update(MOCK_USER, MOCK_USER.id)
      ).resolves.toEqual(MOCK_USER);
    });

    test('should update a user given uid as identifier', async () => {
      mockedUserRepository.update.mockResolvedValue(MOCK_USER);

      await expect(
        mockedUserRepository.update(MOCK_USER, MOCK_USER.username)
      ).resolves.toEqual(MOCK_USER);
    });

    test('should throw if uid is not found', async () => {
      mockedUserRepository.update.mockRejectedValue(new Error());

      await expect(
        mockedUserRepository.update(MOCK_USER, MOCK_USER.id)
      ).rejects.toThrow();
    });

    test('should throw if username is not found', async () => {
      mockedUserRepository.update.mockRejectedValue(new Error());

      await expect(
        mockedUserRepository.update(MOCK_USER, MOCK_USER.username)
      ).rejects.toThrow();
    });
  });

  describe('delete', () => {
    test('should delete a user given username as identifier', async () => {
      mockedUserRepository.__delete.mockResolvedValue(MOCK_USER);

      await expect(
        mockedUserRepository.__delete(MOCK_USER.id)
      ).resolves.toEqual(MOCK_USER);
    });

    test('should delete a user given uid as identifier', async () => {
      mockedUserRepository.__delete.mockResolvedValue(MOCK_USER);

      await expect(
        mockedUserRepository.__delete(MOCK_USER.username)
      ).resolves.toEqual(MOCK_USER);
    });

    test('should throw if uid is not found', async () => {
      mockedUserRepository.__delete.mockRejectedValue(new Error());

      await expect(
        mockedUserRepository.__delete(MOCK_USER.id)
      ).rejects.toThrow();
    });

    test('should throw if username is not found', async () => {
      mockedUserRepository.__delete.mockRejectedValue(new Error());

      await expect(
        mockedUserRepository.__delete(MOCK_USER.username)
      ).rejects.toThrow();
    });
  });
});
