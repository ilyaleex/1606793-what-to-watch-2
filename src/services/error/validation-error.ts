import { StatusCodes } from 'http-status-codes';
import { ValidationError as ValidationErrorType } from './contracts/index.js';

export class ValidationError extends Error {
  httpStatusCode: number;

  details: ValidationErrorType[] = [];

  constructor(message: string, details: ValidationErrorType[]) {
    super(message);
    this.httpStatusCode = StatusCodes.BAD_REQUEST;
    this.message = message;
    this.details = details;
  }
}
