import * as Lambdas from 'src/handlers/lambda';
import { expressHandler } from 'src/libs/middleware/express';

import { Request, Response } from 'express';

export const list = (request: Request, response: Response) => {
  expressHandler(() => {}, request, response);
}

