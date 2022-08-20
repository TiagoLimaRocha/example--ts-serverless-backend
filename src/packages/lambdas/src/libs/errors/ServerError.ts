import { ErrorCode } from './types';

export class ServerError extends Error {
  public statusCode: ErrorCode = 500;
  public name: string = 'Server Error';

  constructor(message: string, statusCode?: ErrorCode) {
    super(message);

    this.statusCode = statusCode;

    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export default ServerError;
