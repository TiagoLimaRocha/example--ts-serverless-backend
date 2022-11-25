import { ServerErrorCodes, ErrorCode } from 'src/libs/errors/types';

interface MockErrorHandlerReturnValue {
  body: string;
  statusCode: ErrorCode;
}

export const MOCK_ERROR_HANDLER_RETURN_VALUE: MockErrorHandlerReturnValue = {
  body: JSON.stringify({ error: 'Internal Server Error' }),
  statusCode: ServerErrorCodes.INTERNAL_SERVER_ERROR,
};
