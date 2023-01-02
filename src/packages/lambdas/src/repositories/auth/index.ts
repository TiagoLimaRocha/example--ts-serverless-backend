import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { join } from 'path';
import { isWithinInterval } from 'date-fns';
import { hash, compare } from 'bcrypt';
import {
  Cipher,
  createCipheriv,
  createDecipheriv,
  Decipher,
  randomBytes,
} from 'crypto';

import { SignPayload, VerifyPayload } from 'src/repositories/auth/types';

const PATH_TO_PRIVATE_PEM = './assets/keys/private.pem';
const PATH_TO_PUBLIC_PEM = './assets/keys/public.pem';

const ASYMMETRIC_ALGORITHM = 'PS256';
const SYMETRIC_ALGORITHM = 'bf';

const IV_LENGTH = 16;
const SALT_ROUNDS = 10;

export const createToken = (payload: SignPayload) => {
  const privateKey: Buffer = readFileSync(join(__dirname, PATH_TO_PRIVATE_PEM));

  const timestamp = new Date().getTime();
  const oneHour = 60 * 60 * 1000;

  const options: SignOptions = {
    algorithm: ASYMMETRIC_ALGORITHM,
    expiresIn: oneHour,
  };

  payload.iat = timestamp;
  delete payload.exp;

  return sign(payload, privateKey, options);
};

export const validateToken = (token: string) => {
  const publicKey = readFileSync(join(__dirname, PATH_TO_PUBLIC_PEM));

  const options: VerifyOptions = {
    algorithms: [ASYMMETRIC_ALGORITHM],
  };

  const decoded = verify(
    token,
    publicKey,
    options,
    (error, decoded: VerifyPayload) => (error ? error : decoded)
  );

  return decoded as unknown as VerifyPayload;
};

export const isActiveToken = (decoded: VerifyPayload): boolean => {
  const { iat, exp } = decoded;

  const now = Date.now();
  const interval = {
    start: new Date(iat),
    end: new Date(exp),
  };

  const result = isWithinInterval(now, interval);

  return result;
};

export const hashPassword = async (pwd: string): Promise<string> => {
  const hashedPwd = await hash(pwd, SALT_ROUNDS);

  return hashedPwd;
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const isValid = await compare(password, hash);

  return isValid;
};

export const encryptPassword = (pwd: string, iv?: Buffer | string) => {
  const key: Buffer = readFileSync(join(__dirname, PATH_TO_PUBLIC_PEM));
  const innitVector: Buffer | string = iv || randomBytes(IV_LENGTH);

  const cipher: Cipher = createCipheriv(SYMETRIC_ALGORITHM, key, innitVector);

  console.log(1, 'Cipher: ', cipher);

  const encrypted = `${cipher.update(pwd, 'utf8', 'hex')}${cipher.final(
    'hex'
  )}`;

  return encrypted;
};

export const decryptPassword = (
  encripted: string,
  innitVector: Buffer | string
) => {
  const key: Buffer = readFileSync(join(__dirname, PATH_TO_PUBLIC_PEM));

  const decipher: Decipher = createDecipheriv(
    SYMETRIC_ALGORITHM,
    key,
    innitVector
  );

  const decrypted = `${decipher.update(
    encripted,
    'hex',
    'utf8'
  )}${decipher.final('utf8')}`;

  return decrypted;
};
