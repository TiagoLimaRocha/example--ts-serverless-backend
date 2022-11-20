import * as UserRepository from 'src/repository/user';
import { DeepMockProxy } from 'jest-mock-extended';

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
