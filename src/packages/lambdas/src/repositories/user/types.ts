import { Prisma } from '@prisma/client';
import { XOR } from 'src/libs/utils';
import { SignPayload } from 'src/repositories/auth/types';

export interface User extends Prisma.UserCreateInput, SignPayload {
  id: number;
}

export type UserUpdate = Prisma.UserUpdateInput;

export type Identifier = XOR<string, number>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type UserMock = any & (User | Prisma.Prisma__UserClient<User>);

export const DEFAULT_OFFSET = 0;
export const DEFAULT_PAGE_SIZE = 10;
