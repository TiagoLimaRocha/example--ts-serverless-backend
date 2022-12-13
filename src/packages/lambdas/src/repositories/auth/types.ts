type Value = object | string | number | null | undefined;

export interface SignPayload {
  [key: string]: Value;
  username: string;
}

export interface VerifyPayload extends SignPayload {
  exp: number;
  iat: number;
}
