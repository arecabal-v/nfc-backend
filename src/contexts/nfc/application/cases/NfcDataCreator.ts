import { NfcRepository } from '@contexts/nfc/domain/NfcRepository';
import { NfcTag } from '@contexts/nfc/domain/NfcTag';

export class NfcDataCreator {
  constructor(
    private readonly nfcRepository: NfcRepository,
  ) {}

  async run(nfcTag: NfcTag): Promise<void> {
    return this.nfcRepository.save(nfcTag);
  }
}
