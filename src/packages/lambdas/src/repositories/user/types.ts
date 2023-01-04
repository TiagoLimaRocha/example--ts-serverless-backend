import { Prisma } from '@prisma/client';
import { XOR } from 'src/libs/utils';
import { SignPayload } from 'src/repositories/auth/types';

export interface User extends Prisma.UserCreateInput, SignPayload {
  id: number;
}

export interface UserLoginDetails {
  username: string;
  password: string;
}

export interface UserLogoutDetails {
  username: string;
}

export type UserUpdate = Prisma.UserUpdateInput;

export type Identifier = XOR<string, number>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UserMock = any & (User | Prisma.Prisma__UserClient<User>);

export const DEFAULT_OFFSET = 0;
export const DEFAULT_PAGE_SIZE = 10;
