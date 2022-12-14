import { ErrorCode } from './types';

const DEFAULT_STATUS_CODE = 400;

class PrismaError extends Error {
  public statusCode: ErrorCode = DEFAULT_STATUS_CODE;
  public name: string = 'Prisma Error';

  constructor(message: string, statusCode?: ErrorCode) {
    super(message);

    this.statusCode = statusCode ?? DEFAULT_STATUS_CODE;

    Object.setPrototypeOf(this, PrismaError.prototype);
  }
}

export default PrismaError;
