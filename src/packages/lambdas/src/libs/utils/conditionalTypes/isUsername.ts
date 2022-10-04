import {
  UserPathParameters,
  UserPathParameterUsername,
} from 'src/handlers/user/types';

const isUsername = (
  pathParameters: UserPathParameters
): pathParameters is UserPathParameterUsername => {
  return (<UserPathParameterUsername>pathParameters).username !== undefined;
};

export default isUsername;
