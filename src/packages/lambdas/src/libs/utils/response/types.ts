/**
 * Success codes enumerations
 * 
 * more info reguarding HTTP status codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */

import { XOR } from 'src/libs/utils';
import { ErrorCode } from 'src/libs/errors/types';

export enum SuccessCodes {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202
}

export type SuccessCode = SuccessCodes;

export type StatusCode = XOR<SuccessCode, ErrorCode>