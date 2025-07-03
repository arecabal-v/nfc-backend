import { NfcRepository } from '../../domain/NfcRepository';
import { PublicNfcTagResponse } from '../../domain/PublicNfcTagResponse';
import { NotFoundError } from '../../../shared/domain/errors/NotFoundError';

export class PublicNfcTagGetter {
  constructor(private repository: NfcRepository) {}

  async run(serialNumber: string): Promise<PublicNfcTagResponse> {
    const nfcTag = await this.repository.searchBySerialNumber(serialNumber);

    if (!nfcTag) {
      throw new NotFoundError(`NFC tag with serial number ${serialNumber} not found`);
    }

    return nfcTag;
  }
}
