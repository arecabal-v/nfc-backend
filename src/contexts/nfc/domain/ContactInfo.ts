import { EmailValidator } from '../../shared/domain/EmailValidator';
import { ContactType } from './ContactType';

export interface ContactInfoData {
  type: ContactType;
  name?: string;
  phone?: string;
  email?: string;
  company?: string;
  position?: string;
}

export class ContactInfo {
  readonly value: ContactInfoData;

  constructor(data: ContactInfoData) {
    this.validateContactInfo(data);
    this.value = data;
  }

  private validateContactInfo(data: ContactInfoData): void {
    if (!data.name || !data.phone || !data.email) {
      throw new Error('Contact info must have name, phone, and email');
    }

    if (!EmailValidator.isValid(data.email)) {
      throw new Error('Invalid email format');
    }
  }
}
 