import {
  UserPathParameters,
  UserPathParameterId,
} from 'src/handlers/user/types';

export const isUserId = (
  pathParameters: UserPathParameters
): pathParameters is UserPathParameterId => {
  return (<UserPathParameterId>pathParameters).userId !== undefined;
};
