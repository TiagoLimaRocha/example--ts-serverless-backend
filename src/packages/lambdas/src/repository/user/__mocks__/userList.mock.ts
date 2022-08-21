import { User } from 'src/repository/user/types';
import MOCK_USERNAME from './username.mock';

const MOCK_USER_LIST: User[] = [...Array(10).keys()].map(
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

export default MOCK_USER_LIST;
