import { ValidationError } from 'class-validator';
import { ValidationError as ValidationErrorType } from '../services/error/contracts/index.js';

export const processValidationErrors = (
  errors: ValidationError[]
): ValidationErrorType[] =>
  errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : [],
  }));
