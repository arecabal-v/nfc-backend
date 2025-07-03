import { Nullable } from '../../shared/domain/Nullable';
import { NfcTag } from './NfcTag';
import { NfcTagId } from './NfcTagId';
import { NfcTagSummary } from './NfcTagSummary';
import { PublicNfcTagResponse } from './PublicNfcTagResponse';
import { UserId } from '../../shared/domain/UserId';

export interface NfcRepository {
  save(nfcTag: NfcTag): Promise<void>;
  search(id: NfcTagId): Promise<Nullable<NfcTag>>;
  searchByUserId(userId: UserId): Promise<NfcTagSummary[]>;
  searchBySerialNumber(serialNumber: string): Promise<Nullable<PublicNfcTagResponse>>;
}
