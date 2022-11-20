import { StatusCode } from './types';

export const response = <T>(statusCode: StatusCode, payload: T) => ({
  statusCode,
  body: JSON.stringify(payload),
});
