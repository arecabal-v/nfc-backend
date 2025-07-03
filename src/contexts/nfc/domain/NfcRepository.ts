import { NfcTag } from './NfcTag';
import { NfcTagId } from './NfcTagId';

export interface NfcRepository {
  save(nfcTag: NfcTag): Promise<void>;
  findById(id: NfcTagId): Promise<NfcTag | null>;
}
