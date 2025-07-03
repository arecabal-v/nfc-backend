import { NfcRepository } from '@contexts/nfc/domain/NfcRepository';
import { NfcTag } from '@contexts/nfc/domain/NfcTag';
import { NfcTagId } from '@contexts/nfc/domain/NfcTagId';

export class NfcDataGetter {
  constructor(private readonly nfcRepository: NfcRepository) {}

  async execute(id: NfcTagId): Promise<NfcTag | null> {
    return this.nfcRepository.findById(id);
  }
}
