import { Request } from 'express';
import { LambdaRequest } from '../types';

/**
 * Converts an uri with colon-based parameters to brackets-based parameters
 * - i.e (:username to {username})
 *
 * @param {string} path The url to map
 * @return {string} The converted uri
 */
const mapPathToApiGateway = (path: string): string =>
  path.replace(/:(.+?)\b/g, '{$1}');

export const mapExpressRequestToLambdaRequest = (request: Request): LambdaRequest => ({
  resource: mapPathToApiGateway(request.route.path),
  pathParameters: request.params,
  queryStringParameters: request.query,
  headers: request.headers,
  body: request.body,
  httpMethod: request.method,
});
