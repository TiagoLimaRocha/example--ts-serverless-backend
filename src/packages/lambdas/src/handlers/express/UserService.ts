import * as Lambdas from 'src/handlers/lambda';
import { expressHandler } from 'src/libs/middleware/express';

import { Request, Response } from 'express';

export const listUsers = (request: Request, response: Response) => {
  expressHandler(Lambdas.listUsers, request, response);
};

export const findUser = (request: Request, response: Response) => {
  expressHandler(Lambdas.findUser, request, response);
};

export const createUser = (request: Request, response: Response) => {
  expressHandler(Lambdas.createUser, request, response);
};

export const updateUser = (request: Request, response: Response) => {
  expressHandler(Lambdas.updateUser, request, response);
};

export const deleteUser = (request: Request, response: Response) => {
  expressHandler(Lambdas.deleteUser, request, response);
};
