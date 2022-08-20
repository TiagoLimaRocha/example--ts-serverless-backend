import { ParsedQs } from 'qs';
import { IncomingHttpHeaders } from 'http';
import { ParamsDictionary } from 'express-serve-static-core';
import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';

export type LambdaFn = (
  event: LambdaRequest,
  context?: Context | null | {},
  callback?: APIGatewayProxyCallback | null
) => void;

export interface LambdaRequest {
  resource: string;
  pathParameters: ParamsDictionary;
  queryStringParameters: ParsedQs;
  headers: IncomingHttpHeaders;
  body: string;
  httpMethod: string;
}
