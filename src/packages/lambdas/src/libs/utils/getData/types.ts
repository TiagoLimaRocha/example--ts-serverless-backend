import { XOR } from 'src/libs/utils';

export type RequestBody = XOR<string, { [key: string]: unknown }>;
