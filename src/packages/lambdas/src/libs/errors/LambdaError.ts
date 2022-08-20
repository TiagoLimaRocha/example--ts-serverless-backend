import { ErrorCode } from './types';

export class LambdaError extends Error {
  public statusCode: ErrorCode = 400;
  public name: string = "Lambda Error";

  constructor(message: string, statusCode?: ErrorCode) {
    super(message);

    this.statusCode = statusCode;

    Object.setPrototypeOf(this, LambdaError.prototype);
  }
}

export default LambdaError;
