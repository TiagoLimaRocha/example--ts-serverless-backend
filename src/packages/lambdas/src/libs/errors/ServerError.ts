import { ErrorCode } from './types';

const DEFAULT_STATUS_CODE = 500;

class ServerError extends Error {
  public statusCode: ErrorCode = DEFAULT_STATUS_CODE;
  public name: string = 'Server Error';

  constructor(message: string, statusCode?: ErrorCode) {
    super(message);

    this.statusCode = statusCode ?? DEFAULT_STATUS_CODE;

    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export default ServerError;
