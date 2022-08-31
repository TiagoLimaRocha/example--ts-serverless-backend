import { RequestBody } from './types';

const getData = (body: RequestBody) => {
  return typeof body === 'string' ? JSON.parse(body) : body;
};

export default getData;
