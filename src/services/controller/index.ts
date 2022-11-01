import { injectable } from 'inversify';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { Router, Response } from 'express';
import { ControllerInterface } from './contracts/index.js';
import {
  LoggerInterface,
  RouteInterface,
  UnknownObject,
} from '../../contracts/index.js';
import { ConfigInterface } from '../config/contracts/index.js';
import { getFullServerPath, transformObject } from '../../utils/index.js';
import { STATIC_RESOURCE_FIELDS } from '../../constants/index.js';

@injectable()
export abstract class ControllerBase implements ControllerInterface {
  private readonly expressRouter: Router;

  constructor(
    protected logger: LoggerInterface,
    protected configService: ConfigInterface
  ) {
    this.expressRouter = Router();
  }

  get router() {
    return this.expressRouter;
  }

  registerRoute(route: RouteInterface) {
    const { path, method, handler, middlewares } = route;
    this.logger.info(
      `Register route. Path: ${path}, method: ${method.toUpperCase()}.`
    );
    this.expressRouter[method](
      path,
      middlewares?.map((middleware) =>
        asyncHandler(middleware.execute.bind(middleware))
      ) ?? [],
      asyncHandler(handler.bind(this))
    );
  }

  send<T>(res: Response, statusCode: StatusCodes, data: T): void {
    if (data) {
      this.addStaticPath(data as UnknownObject);
    }
    res.type('application/json').status(statusCode).json(data);
  }

  created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  noContent<T>(res: Response, data?: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data ?? {});
  }

  private addStaticPath(data: UnknownObject) {
    const { HOST, PORT, STATIC_FILES_DIRECTORY, UPLOAD_FILES_DIRECTORY } =
      this.configService.getFullSchema();
    const fullServerPath = getFullServerPath(HOST, PORT);
    transformObject(
      STATIC_RESOURCE_FIELDS,
      `${fullServerPath}/${STATIC_FILES_DIRECTORY}`,
      `${fullServerPath}/${UPLOAD_FILES_DIRECTORY}`,
      data
    );
  }
}
