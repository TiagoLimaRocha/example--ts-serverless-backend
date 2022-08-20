import { Request, Response } from 'express';
import { LambdaFn } from './types';

import mapExpressRequestToLambdaRequest from './mapExpressRequestToLambdaRequest';

/**
 * Calls respective api handler and sends a express response on lambda done callback.
 *
 * @param request Express request object
 * @param response Express response object
 */
const expressHandler = (
  lambdaFn: LambdaFn,
  request: Request,
  response: Response
) => {
  const lambdaRequest = mapExpressRequestToLambdaRequest(request);

  lambdaFn(lambdaRequest, {}, (error, result) =>
    response
      .set(result?.headers ?? {})
      .status(result.statusCode)
      .send(result.body)
  );
};

export default expressHandler;
