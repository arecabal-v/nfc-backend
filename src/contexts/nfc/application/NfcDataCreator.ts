import { NfcTag } from '../domain/NfcTag';
import { NfcRepository } from '../domain/NfcRepository';

export class NfcDataCreator {
  constructor(
    private readonly nfcRepository: NfcRepository,
  ) {}

  async run(nfcTag: NfcTag): Promise<void> {
    return this.nfcRepository.save(nfcTag);
  }
}
