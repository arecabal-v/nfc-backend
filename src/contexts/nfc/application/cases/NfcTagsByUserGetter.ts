import { NfcRepository } from '@contexts/nfc/domain/NfcRepository';
import { NfcTagSummary } from '@contexts/nfc/domain/NfcTagSummary';
import { UserId } from '@contexts/shared/domain/UserId';

export class NfcTagsByUserGetter {
  constructor(private readonly nfcRepository: NfcRepository) {}

  async execute(userId: UserId): Promise<NfcTagSummary[]> {
    return this.nfcRepository.searchByUserId(userId);
  }
}
 