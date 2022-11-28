import { UserPathParameterUsername } from 'src/handlers/user/types';
import { APIGatewayProxyEventPathParameters } from 'aws-lambda';

export const isUsername = (
  pathParameters: APIGatewayProxyEventPathParameters
): pathParameters is UserPathParameterUsername => {
  return (<UserPathParameterUsername>pathParameters).username !== undefined;
};
