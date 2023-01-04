import { Prisma } from '@prisma/client';

type Value = object | string | number | null | undefined;

export type PasswordValidationResponse = {
  isValid: boolean,
  message: string
}

export interface RevokedAuthToken extends Prisma.RevokedAuthTokensCreateInput {
  id: number;
}

export interface SignPayload {
  [key: string]: Value;
  username: string;
}

export interface VerifyPayload extends SignPayload {
  exp: number;
  iat: number;
}
