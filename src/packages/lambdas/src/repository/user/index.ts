import { prisma } from 'src/plugins/prisma';
import { match } from 'src/libs/utils';

import {
  User,
  UpdateIdentifierArgument,
  DEFAULT_OFFSET,
  DEFAULT_PAGE_SIZE,
} from './types';

export const create = (user: User): Promise<User> =>
  prisma.user.create({
    data: user,
  });

export const update = (
  user: User,
  identifier: UpdateIdentifierArgument
): Promise<User> => {
  const where = match(identifier)
    .on(
      (identifier: UpdateIdentifierArgument) => typeof identifier === 'string',
      () => ({
        username: identifier,
      })
    )
    .on(
      (identifier: UpdateIdentifierArgument) => typeof identifier === 'number',
      () => ({
        id: identifier,
      })
    )
    .otherwise(() => null);

  return prisma.user.update({
    where,
    data: {
      ...user,
      createdAt: new Date().toISOString(),
    },
  });
};

export const getById = (id: number): Promise<User> =>
  prisma.user.findFirst({
    where: {
      id: id,
    },
  });

export const getByName = (username: string): Promise<User> =>
  prisma.user.findUnique({
    where: {
      username: username,
    },
  });

export const deleteById = (id: number): Promise<User> =>
  prisma.user.delete({
    where: {
      id: id,
    },
  });

export const deleteByName = (username: string): Promise<User> =>
  prisma.user.delete({
    where: {
      username: username,
    },
  });

export const list = async (
  pageSize: number,
  offset: number
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
