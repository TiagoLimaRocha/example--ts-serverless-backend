import * as UserRepository from 'src/repository/user';
import { DeepMockProxy } from 'jest-mock-extended';

import { User } from 'src/repository/user/types';

jest.mock('src/repository/user', () => ({
  __esModule: true,
  default: async () => {
    const { mockDeep } = await import('jest-mock-extended');

    return mockDeep<typeof UserRepository>();
  },
  create: jest.fn(),
  get: jest.fn(),
  list: jest.fn(),
  update: jest.fn(),
  __delete: jest.fn(),
}));

beforeEach(() => {
  jest.resetAllMocks();
});

export const mockedUserRepository = UserRepository as unknown as DeepMockProxy<
  typeof UserRepository
>;

export const MOCK_USERNAME = 'mock_user';

export const MOCK_USER_LIST: User[] = [...Array(10).keys()].map(
  (key: number): User => {
    const identifier: string = `${MOCK_USERNAME}_${key}`;

    return {
      id: key,
      email: `${identifier}@email.com`,
      username: identifier,
      firstName: `${identifier}_first_name`,
      lastName: `${identifier}_last_name`,
      phone: '0000000000',
      createdAt: `${new Date().toISOString()}`,
    };
  }
);

export const MOCK_USER = MOCK_USER_LIST[0];
