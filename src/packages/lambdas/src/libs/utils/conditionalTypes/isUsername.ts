import {
  UserPathParameters,
  UserPathParameterUsername,
} from 'src/handlers/user/types';

export const isUsername = (
  pathParameters: UserPathParameters
): pathParameters is UserPathParameterUsername => {
  return (<UserPathParameterUsername>pathParameters).username !== undefined;
};
