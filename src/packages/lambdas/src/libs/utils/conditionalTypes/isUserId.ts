import {
  UserPathParameters,
  UserPathParameterId,
} from 'src/handlers/user/types';

const isUserId = (
  pathParameters: UserPathParameters
): pathParameters is UserPathParameterId => {
  return (<UserPathParameterId>pathParameters).userId !== undefined;
};

export default isUserId;
