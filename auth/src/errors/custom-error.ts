import { RequestValidationError } from './request-validation-error';

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    //Only because we are extending a built in class
    // Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
