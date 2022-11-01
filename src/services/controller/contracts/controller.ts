import { Router, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RouteInterface } from '../../../contracts/index.js';

export interface ControllerInterface {
  router: Router;
  registerRoute(route: RouteInterface): void;
  send<T>(res: Response, statusCode: StatusCodes, data: T): void;
}
