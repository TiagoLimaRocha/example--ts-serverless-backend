import { XOR } from 'src/libs/utils';
import { Prisma } from '@prisma/client';

export type Identifier = XOR<string, number>;

export type Result = Prisma.UserWhereUniqueInput;
