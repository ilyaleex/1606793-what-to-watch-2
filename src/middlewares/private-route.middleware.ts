import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MiddlewareInterface } from '../contracts/index.js';
import { HttpError } from '../services/error/index.js';

export class PrivateRouteMiddleware implements MiddlewareInterface {
  async execute(
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    if (!req.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}
