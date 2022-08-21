import { User } from 'src/repository/user/types';

const createdAt = new Date().toISOString();

const MOCK_USER: User = {
  id: 1,
  email: 'mock@email.com',
  username: 'mock_username',
  firstName: 'mock_first_name',
  lastName: 'mock_last_name',
  phone: '0000000000',
  createdAt: createdAt.toString(),
};

export default MOCK_USER;
