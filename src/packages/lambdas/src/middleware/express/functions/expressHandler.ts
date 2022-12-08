import { Request, Response } from 'express';
import { LambdaFn } from '../types';

import { mapExpressRequestToLambdaRequest } from './mapExpressRequestToLambdaRequest';

/**
 * Calls respective api handler and sends a express response on lambda done callback.
 *
 * @param request Express request object
 * @param response Express response object
 */
export const expressHandler = async (
  lambdaFn: LambdaFn,
  request: Request,
  response: Response
) => {
  const lambdaRequest = mapExpressRequestToLambdaRequest(request);

  response.send(await lambdaFn(lambdaRequest));
};
