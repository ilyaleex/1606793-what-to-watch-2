import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { MiddlewareInterface } from '../contracts/index.js';
import { HttpError } from '../services/error/index.js';

export class ValidateObjectIdMiddleware implements MiddlewareInterface {
  constructor(private param: string) {}

  execute({ params }: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];

    if (!isValidObjectId(objectId)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Invalid passed id: ${objectId}`,
        this.constructor.name
      );
    }

    next();
  }
}
