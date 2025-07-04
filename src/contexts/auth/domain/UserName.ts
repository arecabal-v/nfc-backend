import { BadRequestError } from '@contexts/shared/domain/errors/BadRequestError';
import { StringValueObject } from '../../shared/domain/value-object/string';

export class UserName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureValidName(value);
  }

  private ensureValidName(value: string): void {
    if (value.length < 2) {
      throw new BadRequestError('Name must be at least 2 characters long');
    }
    if (value.length > 100) {
      throw new BadRequestError('Name must not exceed 100 characters');
    }
  }
}
