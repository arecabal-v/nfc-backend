import { CommandHandler } from '../../shared/domain/cqrs/CommandHandler';
import { NfcDataCreatorCommand } from '../domain/NfcDataCreatorCommand';
import { NfcDataCreator } from './NfcDataCreator';
import { NfcTag } from '../domain/NfcTag';
import { NfcTagId } from '../domain/NfcTagId';
import { UserId } from '../../shared/domain/UserId';
import { NfcData } from '../domain/NfcData';
import { ContactInfo } from '../domain/ContactInfo';

export class NfcDataCreatorCommandHandler implements CommandHandler<NfcDataCreatorCommand> {
  constructor(private readonly nfcDataCreator: NfcDataCreator) {}

  subscribedTo(): typeof NfcDataCreatorCommand {
    return NfcDataCreatorCommand;
  }

  async handle(command: NfcDataCreatorCommand): Promise<void> {
    const nfcTagId = NfcTagId.random();
    const userId = new UserId(command.userId);
    const contactInfoArray = command.contactInfo.map((info) => {
      return new ContactInfo(info)
    });
    const nfcData = new NfcData({ contactInfo: contactInfoArray });
    const nfcTag = NfcTag.create(nfcTagId, userId, command.serialNumber, nfcData);
    await this.nfcDataCreator.run(nfcTag);
  }
}
