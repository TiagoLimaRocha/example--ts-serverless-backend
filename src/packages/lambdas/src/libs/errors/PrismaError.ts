import { ErrorCode } from './types';

export class PrismaError extends Error {
  public statusCode: ErrorCode = 400;
  public name: string = 'Prisma Error';

  constructor(message: string, statusCode?: ErrorCode) {
    super(message);

    this.statusCode = statusCode;

    Object.setPrototypeOf(this, PrismaError.prototype);
  }
}

export default PrismaError;
