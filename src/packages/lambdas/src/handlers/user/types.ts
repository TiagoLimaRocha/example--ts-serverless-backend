import { APIGatewayProxyEventPathParameters } from 'aws-lambda';
import { XOR } from 'src/libs/utils';

export interface UserPathParameterId
  extends APIGatewayProxyEventPathParameters {
  userId: string;
}

export interface UserPathParameterUsername
  extends APIGatewayProxyEventPathParameters {
  username: string;
}

export interface UserPathParametersList
  extends APIGatewayProxyEventPathParameters {
  offset: string;
  pageSize: string;
}

export type UserPathParameters = XOR<
  UserPathParameterId,
  UserPathParameterUsername
>;
