import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

import { prisma } from 'src/plugins/prisma/client';

jest.mock('src/plugins/prisma/client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
  prisma: mockDeep<PrismaClient>(),
}));

export const mockedPrisma = prisma as unknown as DeepMockProxy<PrismaClient>;
