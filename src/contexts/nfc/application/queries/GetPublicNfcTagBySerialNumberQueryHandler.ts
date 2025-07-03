import { QueryHandler } from '../../../shared/domain/cqrs/QueryHandler';
import { GetPublicNfcTagBySerialNumberQuery } from '../../domain/GetPublicNfcTagBySerialNumberQuery';
import { PublicNfcTagResponse } from '../../domain/PublicNfcTagResponse';
import { PublicNfcTagGetter } from '../cases/PublicNfcTagGetter';

export class GetPublicNfcTagBySerialNumberQueryHandler implements QueryHandler<GetPublicNfcTagBySerialNumberQuery, PublicNfcTagResponse> {
  constructor(private getter: PublicNfcTagGetter) {}

  subscribedTo(): typeof GetPublicNfcTagBySerialNumberQuery {
    return GetPublicNfcTagBySerialNumberQuery;
  }

  async handle(query: GetPublicNfcTagBySerialNumberQuery): Promise<PublicNfcTagResponse> {
    return this.getter.run(query.serialNumber);
  }
}
