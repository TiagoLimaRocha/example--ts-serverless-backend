type Value = object | string | number | null | undefined;

export interface SignPayload {
  [key: string]: Value;
}

export interface VerifyPayload extends SignPayload {
  exp: number;
}
