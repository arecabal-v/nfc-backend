import { BaseError } from '../BaseError';

export class UnauthorizedError extends BaseError {
  constructor(
    readonly message: string = 'Unauthorized Error',
    readonly code: string = 'INT-002',
    readonly error: string = message,
    readonly status: number = 401,
  ) {
    super(message, status, { error, code });
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
