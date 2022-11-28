import { Prisma } from '@prisma/client';
import { XOR } from 'src/libs/utils';
import { DeepMockProxy } from 'jest-mock-extended';

export interface User extends Prisma.UserCreateInput {
  id: number;
}

export type Identifier = XOR<string, number>;

// @ts-ignore
export type UserMock = any & (User | Prisma.Prisma__UserClient<User>);

export const DEFAULT_OFFSET = 0;
export const DEFAULT_PAGE_SIZE = 10;
