import { StringValueObject } from '../../shared/domain/value-object/string';
import { EmailValidator } from '../../shared/domain/EmailValidator';

export class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureValidEmail(value);
  }

  private ensureValidEmail(value: string): void {
    if (!EmailValidator.isValid(value)) {
      throw new Error('Invalid email format');
    }
  }
}
 