import { Command } from '../../shared/domain/cqrs/Command';
import { ContactType } from './ContactType';

export class NfcDataCreatorCommand implements Command {
  constructor(
    public readonly nfcTagId: string,
    public readonly userId: string,
    public readonly serialNumber: string,
    public readonly contactInfo: Array<{
      type: ContactType;
      name?: string;
      phone?: string;
      email?: string;
      company?: string;
      position?: string;
    }>,
  ) {}
}
