import * as Lambdas from 'src/handlers/lambda';
import { expressHandler } from 'src/libs/middleware/express';

import { Request, Response } from 'express';

export const listUsers = (request: Request, response: Response) => {
  expressHandler(Lambdas.listUsers, request, response);
};

export const findUserById = (request: Request, response: Response) => {
  expressHandler(Lambdas.findUserById, request, response);
};

export const findUserByUsername = (request: Request, response: Response) => {
  expressHandler(Lambdas.findUserByUsername, request, response);
};

export const createUser = (request: Request, response: Response) => {
  expressHandler(Lambdas.createUser, request, response);
};

export const updateUserById = (request: Request, response: Response) => {
  expressHandler(Lambdas.updateUserById, request, response);
};

export const updateUserByUsername = (request: Request, response: Response) => {
  expressHandler(Lambdas.updateUserByUsername, request, response);
};

export const deleteUserById = (request: Request, response: Response) => {
  expressHandler(Lambdas.deleteUserById, request, response);
};

export const deleteUserByUsername = (request: Request, response: Response) => {
  expressHandler(Lambdas.deleteUserByUsername, request, response);
};
