import { prisma } from 'src/plugins/prisma';
import { User, DEFAULT_OFFSET, DEFAULT_PAGE_SIZE } from './types';

export const create = (user: User): Promise<User> =>
  prisma.user.create({
    data: user,
  });

export const update = (user: User): Promise<User> =>
  prisma.user.update({
    where: {
      email: user.email,
    },
    data: user,
  });

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
  const take = offset || DEFAULT_OFFSET;
  const skip = pageSize || DEFAULT_PAGE_SIZE;

  const users = await prisma.user.findMany({
    take,
    skip,
    orderBy: {
      username: 'asc',
    },
  });

  return users;
};
