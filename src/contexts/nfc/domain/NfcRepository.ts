import { NfcTag } from './NfcTag';

export interface NfcRepository {
  save(nfcTag: NfcTag): Promise<void>;
} 