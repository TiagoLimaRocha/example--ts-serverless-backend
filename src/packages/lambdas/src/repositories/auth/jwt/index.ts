import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken';

import { readFileSync } from 'fs';
import { join } from 'path';

import { SignPayload, VerifyPayload } from 'src/repositories/auth/jwt/types';

const PATH_TO_PRIVATE_PEM = './assets/keys/private.pem';
const PATH_TO_PUBLIC_PEM = './assets/keys/public.pem';

const algorithm = 'PS256';

export const createToken = (payload: SignPayload) => {
  const privateKey: Buffer = readFileSync(join(__dirname, PATH_TO_PRIVATE_PEM));

  const options: SignOptions = {
    algorithm,
    expiresIn: '1h',
  };

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

  return decoded;
};
