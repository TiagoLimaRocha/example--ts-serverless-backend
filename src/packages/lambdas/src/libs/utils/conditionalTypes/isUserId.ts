import { UserPathParameterId } from 'src/handlers/user/types';
import { APIGatewayProxyEventPathParameters } from 'aws-lambda';

export const isUserId = (
  pathParameters: APIGatewayProxyEventPathParameters
): pathParameters is UserPathParameterId => {
  return (<UserPathParameterId>pathParameters).userId !== undefined;
};
