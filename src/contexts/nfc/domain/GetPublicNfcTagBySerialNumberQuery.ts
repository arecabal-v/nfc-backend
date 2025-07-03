import { Query } from '../../shared/domain/cqrs/Query';

export class GetPublicNfcTagBySerialNumberQuery extends Query {
  constructor(readonly serialNumber: string) {
    super();
  }
}
