import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { join } from 'path';
import { isWithinInterval } from 'date-fns';

import { SignPayload, VerifyPayload } from 'src/repositories/auth/types';

const PATH_TO_PRIVATE_PEM = './assets/keys/private.pem';
const PATH_TO_PUBLIC_PEM = './assets/keys/public.pem';

const algorithm = 'PS256';

export const createToken = (payload: SignPayload) => {
  const privateKey: Buffer = readFileSync(join(__dirname, PATH_TO_PRIVATE_PEM));

  const timestamp = new Date().getTime();
  // const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  const options: SignOptions = {
    algorithm,
    expiresIn: oneMinute,
  };

  payload.iat = timestamp;
  delete payload.exp;

  return sign(payload, privateKey, options);
};

export const validateToken = (token: string) => {
  const publicKey = readFileSync(join(__dirname, PATH_TO_PUBLIC_PEM));

  const options: VerifyOptions = {
    algorithms: [algorithm],
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
