
import { PolicyEffect } from './types';

export const buildPolicyStatement = (
  actions: string[],
  effect: PolicyEffect
) => {
  return {
    principalId: 'user',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: actions,
          Effect: effect,
          Resource: '*',
        },
      ],
    },
  };
};
