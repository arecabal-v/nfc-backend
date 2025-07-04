import { BadRequestError } from '@contexts/shared/domain/errors/BadRequestError';
import { ContactInfo } from './ContactInfo';

export interface NfcDataValue {
  contactInfo: ContactInfo[];
}

export class NfcData {
  readonly value: NfcDataValue;

  constructor(data: Partial<NfcDataValue> = {}) {
    this.value = {
      contactInfo: data.contactInfo || [],
    };

    this.validateNfcData();
  }

  private validateNfcData(): void {
    const hasAnyData =
      this.value.contactInfo.length > 0;

    if (!hasAnyData) {
      throw new BadRequestError('NFC data must contain at least one piece of information');
    }
  }

  addContactInfo(contactInfo: ContactInfo): NfcData {
    return new NfcData({
      ...this.value,
      contactInfo: [...this.value.contactInfo, contactInfo],
    });
  }
}
