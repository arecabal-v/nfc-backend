import { StringValueObject } from '../../shared/domain/value-object/string';

export class UserName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureValidName(value);
  }

  private ensureValidName(value: string): void {
    if (value.length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
    if (value.length > 100) {
      throw new Error('Name must not exceed 100 characters');
    }
  }
}
