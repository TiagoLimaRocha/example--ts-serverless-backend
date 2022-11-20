import { RequestBody } from './types';

export const getData = (body: RequestBody) => {
  return typeof body === 'string' ? JSON.parse(body) : body;
};

