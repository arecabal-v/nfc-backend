import { ContactInfo } from './ContactInfo';
import { ContactType } from './ContactType';

export class PublicNfcTagResponse {
  constructor(
    readonly serialNumber: string,
    readonly contactInfo: ContactInfo[],
  ) {}

  static fromPrimitives(plainData: {
    serialNumber: string;
    contactInfo: Array<{
      type: ContactType;
      name: string;
      phone: string;
      email: string;
      company?: string;
      position?: string;
    }>;
  }): PublicNfcTagResponse {
    return new PublicNfcTagResponse(
        plainData.serialNumber,
        plainData.contactInfo.map((contact) => {
          return new ContactInfo({
            type: contact.type,
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            company: contact.company,
            position: contact.position,
          });
        }),
    );
  }

  toPrimitives() {
    return {
      serialNumber: this.serialNumber,
      contactInfo: this.contactInfo.map((contact) => {
        return contact.value;
      }),
    };
  }
}
