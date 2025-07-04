import { CommandHandler } from '@contexts/shared/domain/cqrs/CommandHandler';
import { NfcDataCreatorCommand } from '@contexts/nfc/domain/NfcDataCreatorCommand';
import { NfcDataCreator } from '../cases/NfcDataCreator';
import { NfcDataGetter } from '../cases/NfcDataGetter';
import { NfcTag } from '@contexts/nfc/domain/NfcTag';
import { NfcTagId } from '@contexts/nfc/domain/NfcTagId';
import { UserId } from '@contexts/shared/domain/UserId';
import { NfcData } from '@contexts/nfc/domain/NfcData';
import { ContactInfo } from '@contexts/nfc/domain/ContactInfo';

export class NfcDataCreatorCommandHandler implements CommandHandler<NfcDataCreatorCommand> {
  constructor(
    private readonly nfcDataCreator: NfcDataCreator,
    private readonly nfcDataGetter: NfcDataGetter,
  ) {}

  subscribedTo(): typeof NfcDataCreatorCommand {
    return NfcDataCreatorCommand;
  }

  async handle(command: NfcDataCreatorCommand): Promise<void> {
    const nfcTagId = new NfcTagId(command.nfcTagId);
    const userId = new UserId(command.userId);
    const contactInfoArray = command.contactInfo.map((info) => {
      return new ContactInfo(info);
    });
    const nfcData = new NfcData({ contactInfo: contactInfoArray });

    const existingNfcTag = await this.nfcDataGetter.run(nfcTagId);
    let nfcTag: NfcTag;

    if (existingNfcTag) nfcTag = existingNfcTag.updateData(nfcData);
    else nfcTag = NfcTag.create(nfcTagId, userId, command.serialNumber, nfcData);

    await this.nfcDataCreator.run(nfcTag);
  }
}
