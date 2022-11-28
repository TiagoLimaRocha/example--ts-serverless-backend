import { User, UserMock } from 'src/repositories/user/types';

export const MOCK_USERNAME = 'mock_user';

export const MOCK_USER_LIST: UserMock[] = [...Array(10).keys()].map(
  (key: number): UserMock => {
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
