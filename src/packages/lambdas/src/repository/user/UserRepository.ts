import { prisma } from 'src/plugins/prisma';
import { User } from './types';

export const create = async (user: User): Promise<User> => 
  prisma.user.create({
    data: user,
  });

export const update = async (user: User): Promise<User> =>
  prisma.user.update({
    where: {
      email: user.email,
    },
    data: user,
  });

export const getById = async (id: number): Promise<User> =>
  prisma.user.findFirst({
    where: {
      id: id,
    },
  });

export const getByName = async (username: string): Promise<User> =>
  prisma.user.findUnique({
    where: {
      username: username,
    },
  });

export const deleteById = async (id: number): Promise<User> =>
  prisma.user.delete({
    where: {
      id: id,
    },
  });

export const deleteByName = async (username: string): Promise<User> =>
  prisma.user.delete({
    where: {
      username: username,
    },
  });

export const list = async (pageSize: number, offset: number): Promise<User[]> =>
  prisma.user.findMany({
    take: pageSize,
    skip: offset,
    orderBy: {
      username: 'asc',
    },
  });
