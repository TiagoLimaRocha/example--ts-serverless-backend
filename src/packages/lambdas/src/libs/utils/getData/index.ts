import { RequestBody } from './types';

export const getData = <T>(body: RequestBody): T => {
  return typeof body === 'string' ? JSON.parse(body) : body;
};
