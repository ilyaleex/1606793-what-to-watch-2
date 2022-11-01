import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  MiddlewareInterface,
  EntityExistsInterface,
} from '../contracts/index.js';
import { HttpError } from '../services/error/index.js';

export class EntityExistsMiddleware implements MiddlewareInterface {
  constructor(
    private param: string,
    private service: EntityExistsInterface,
    private details: string
  ) {}

  async execute(
    { params }: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = params[this.param];
    const isEntityExists = await this.service.isExists(id);

    if (!isEntityExists) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Entity with id ${id} doesnt exist.`,
        this.details
      );
    }

    next();
  }
}
