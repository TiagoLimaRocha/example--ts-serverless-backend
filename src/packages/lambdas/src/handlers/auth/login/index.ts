import { errorHandler, response, getData } from 'src/libs/utils';

import { SuccessCodes } from 'src/libs/utils/response/types';
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';

export const login = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    return response(SuccessCodes.CREATED, {});
  } catch (error) {
    return errorHandler(error, event);
  }
};
