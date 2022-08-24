import {
  UserPathParameters,
  UserPathParameterUsername,
} from 'src/handlers/lambda/user/types';

const isUsername = (
  pathParameters: UserPathParameters
): pathParameters is UserPathParameterUsername => {
  return (<UserPathParameterUsername>pathParameters).username !== undefined;
};

export default isUsername;
