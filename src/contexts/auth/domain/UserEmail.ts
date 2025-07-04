import { StringValueObject } from '../../shared/domain/value-object/string';
import { EmailValidator } from '../../shared/domain/EmailValidator';
import { BadRequestError } from '@contexts/shared/domain/errors/BadRequestError';

export class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureValidEmail(value);
  }

  private ensureValidEmail(value: string): void {
    if (!EmailValidator.isValid(value)) {
      throw new BadRequestError('Invalid email format');
    }
  }
}
 