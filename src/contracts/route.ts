import { Request, Response, NextFunction } from 'express';
import { HttpMethod } from '../constants/index.js';
import { MiddlewareInterface } from '../contracts/index.js';

export interface RouteInterface {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: MiddlewareInterface[];
}
