import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import {
  ExceptionFilterInterface,
  ValidationError as ValidationErrorType,
} from './contracts/index.js';
import { LoggerInterface } from '../../contracts/index.js';
import { ContainerIoC } from '../../constants/index.js';
import { Error as ErrorType } from './constants/index.js';
import { HttpError, ValidationError } from './index.js';

@injectable()
export class ExceptionFilter implements ExceptionFilterInterface {
  private static createErrorObject(
    type: ErrorType,
    message: string,
    details?: ValidationErrorType[]
  ) {
    return {
      type,
      message,
      details,
    };
  }

  constructor(
    @inject(ContainerIoC.LoggerInterface) private logger: LoggerInterface
  ) {
    this.logger.info('Register ExceptionFilter');
  }

  catch(
    error: Error | HttpError | ValidationError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    switch (error.constructor) {
      case HttpError:
        this.handleHttpError(error as HttpError, req, res, next);
        break;
      case ValidationError:
        this.handleValidationError(error as ValidationError, req, res, next);
        break;
      default:
        this.handleOtherError(error, req, res, next);
        break;
    }
  }

  private handleValidationError(
    error: ValidationError,
    _req: Request,
    res: Response,
    // eslint-disable-next-line
    _next: NextFunction
  ) {
    const { message, details } = error;
    res
      .status(error.httpStatusCode)
      .json(
        ExceptionFilter.createErrorObject(
          ErrorType.ValidationError,
          message,
          details
        )
      );
  }

  private handleHttpError(
    error: HttpError,
    _req: Request,
    res: Response,
    // eslint-disable-next-line
    _next: NextFunction
  ) {
    const { message } = error;
    this.logger.error(
      `[${error.details}]: ${error.httpStatusCode} — ${error.message}`
    );
    res
      .status(error.httpStatusCode)
      .json(ExceptionFilter.createErrorObject(ErrorType.CommonError, message));
  }

  private handleOtherError(
    error: Error,
    _req: Request,
    res: Response,
    // eslint-disable-next-line
    _next: NextFunction
  ) {
    const { message } = error;
    this.logger.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ExceptionFilter.createErrorObject(ErrorType.ServiceError, message));
  }
}
