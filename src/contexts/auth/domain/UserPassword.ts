import { StringValueObject } from '../../shared/domain/value-object/string';
import * as crypto from 'crypto';

export class UserPassword extends StringValueObject {
  constructor(value: string, isHashed: boolean = false) {
    if (!isHashed) {
      value = UserPassword.hash(value);
    }
    super(value);
    this.ensureValidPassword(value);
  }

  static hash(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  static verify(password: string, hashedPassword: string): boolean {
    const hashedInput = UserPassword.hash(password);
    return hashedInput === hashedPassword;
  }

  private ensureValidPassword(value: string): void {
    if (value.length === 0) {
      throw new Error('Password cannot be empty');
    }
  }
}
