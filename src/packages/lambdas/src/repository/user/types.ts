import { Prisma } from '@prisma/client';
export interface User extends Prisma.UserCreateInput {
  id: number;
}
