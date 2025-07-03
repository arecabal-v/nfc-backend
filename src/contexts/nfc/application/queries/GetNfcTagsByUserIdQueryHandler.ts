import { NfcTagSummary } from '@contexts/nfc/domain/NfcTagSummary';
import { QueryHandler } from '../../../shared/domain/cqrs/QueryHandler';
import { GetNfcTagsByUserIdQuery } from '../../domain/GetNfcTagsByUserIdQuery';
import { NfcTagsByUserGetter } from '../cases/NfcTagsByUserGetter';
import { Query } from '@contexts/shared/domain/cqrs/Query';
import { UserId } from '@contexts/shared/domain/UserId';

export class GetNfcTagsByUserIdQueryHandler implements QueryHandler<GetNfcTagsByUserIdQuery, NfcTagSummary[]> {
  constructor(private readonly nfcTagsByUserGetter: NfcTagsByUserGetter) {}

  subscribedTo(): Query {
    return GetNfcTagsByUserIdQuery;
  }

  async handle(query: GetNfcTagsByUserIdQuery): Promise<NfcTagSummary[]> {
    const userId = new UserId(query.userId);
    return await this.nfcTagsByUserGetter.execute(userId);
  }
}
