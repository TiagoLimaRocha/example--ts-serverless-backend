import { Prisma } from '@prisma/client';
export interface User extends Prisma.UserCreateInput {
  id: number;
}

export const DEFAULT_OFFSET = 0;
export const DEFAULT_PAGE_SIZE = 10;