import * as AuthRepository from 'src/repositories/auth';
import * as UserRepository from 'src/repositories/user';

import { errorHandler, buildPolicyStatement } from 'src/libs/utils';
import { LambdaError } from 'src/libs/errors';

import { PolicyEffect } from 'src/libs/utils/buildPolicyStatement/types';
import {
  APIGatewayTokenAuthorizerEvent,
  APIGatewayAuthorizerResult,
} from 'aws-lambda';

const PREFIX = 'bearer';
const ACTIONS = ['lambda:*', 'apigateway:*', 'rds:*'];

export const authorizer = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  try {
    const { authorizationToken } = event || {};

    if (!authorizationToken) {
      throw new LambdaError('Missing token');
    }

    const jwt = (authorizationToken as string).toLowerCase().startsWith(PREFIX)
      ? (authorizationToken as string).slice(PREFIX.length).trim()
      : (authorizationToken as string);

    const decoded = AuthRepository.validateToken(jwt);

    if (!decoded.username) {
      throw new LambdaError('Invalid token');
    }

    if (!AuthRepository.isActiveToken(decoded)) {
      throw new LambdaError('Expired token');
    }

    if (await AuthRepository.isRevokedToken(jwt)) {
      throw new LambdaError('Revoked token');
    }

    const newToken = `Bearer ${AuthRepository.createToken(decoded)}`;

    UserRepository.update({ token: newToken }, 'new_mock_username');

    return buildPolicyStatement(ACTIONS, PolicyEffect.ALLOW);
  } catch (error) {
    errorHandler(error, event);
    return buildPolicyStatement(ACTIONS, PolicyEffect.DENY);
  }
};
