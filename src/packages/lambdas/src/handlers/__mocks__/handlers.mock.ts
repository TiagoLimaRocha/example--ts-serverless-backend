import { APIGatewayEvent } from 'aws-lambda';
import { mockDeep } from 'jest-mock-extended';

export const MOCK_EVENT = mockDeep<APIGatewayEvent>();

export const MOCK_RESPONSE = {
  body: {},
  statusCode: NaN,
};
