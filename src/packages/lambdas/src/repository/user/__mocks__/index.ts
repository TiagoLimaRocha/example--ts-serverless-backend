import { User } from 'src/repository/user/types';

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
