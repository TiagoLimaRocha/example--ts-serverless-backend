import { StatusCode } from './types';

const response = <T>(statusCode: StatusCode, payload: T) => ({
  statusCode,
  body: JSON.stringify(payload),
});

export default response;