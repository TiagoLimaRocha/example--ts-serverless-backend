import { prisma } from 'src/plugins/prisma/client';
import { assertWhereClause } from 'src/libs/utils';

import { User, Identifier, DEFAULT_OFFSET, DEFAULT_PAGE_SIZE } from './types';

export const create = (user: User): Promise<User> =>
  prisma.user.create({
    data: user,
  });

export const update = (user: User, identifier: Identifier): Promise<User> => {
  const where = assertWhereClause(identifier);

  return prisma.user.update({
    where,
    data: {
      ...user,
      createdAt: new Date().toISOString(),
    },
  });
};

export const get = (
  identifier: Identifier
): Promise<User | null | undefined> => {
  const where = assertWhereClause(identifier);

  return prisma.user.findUnique({ where });
};

export const __delete = (identifier: Identifier): Promise<User> => {
  const where = assertWhereClause(identifier);

  return prisma.user.delete({ where });
};

export const list = async (
  pageSize?: number,
  offset?: number
): Promise<User[]> => {
  const take = pageSize || DEFAULT_PAGE_SIZE;
  const skip = offset || DEFAULT_OFFSET;

  const users = await prisma.user.findMany({
    take,
    skip,
    orderBy: {
      username: 'asc',
    },
  });

  return users;
};
