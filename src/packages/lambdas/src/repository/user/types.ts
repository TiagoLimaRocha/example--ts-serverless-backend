import { Prisma } from '@prisma/client';
import { XOR } from 'src/libs/utils';

export interface User extends Prisma.UserCreateInput {
  id: number;
}

export type Identifier = XOR<string, number>;

export const DEFAULT_OFFSET = 0;
export const DEFAULT_PAGE_SIZE = 10;
