import { QueryHandler } from '../../../shared/domain/cqrs/QueryHandler';
import { GetNfcTagByIdQuery } from '../../domain/GetNfcTagByIdQuery';
import { NfcTag } from '../../domain/NfcTag';
import { Query } from '@contexts/shared/domain/cqrs/Query';
import { NfcDataGetter } from '../cases/NfcDataGetter';
import { NfcTagId } from '@contexts/nfc/domain/NfcTagId';

export class GetNfcTagByIdQueryHandler implements QueryHandler<GetNfcTagByIdQuery, NfcTag> {
  constructor(private readonly nfcDataGetter: NfcDataGetter) {}

  subscribedTo(): Query {
    return GetNfcTagByIdQuery;
  }

  async handle(query: GetNfcTagByIdQuery): Promise<NfcTag> {
    const nfcTagId = new NfcTagId(query.id);
    const nfcTag = await this.nfcDataGetter.run(nfcTagId);

    if (!nfcTag) throw new Error('Nfc tag not found');
    return nfcTag;
  }
}
