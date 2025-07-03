import { Query } from '@contexts/shared/domain/cqrs/Query';

export class GetNfcTagsByUserIdQuery extends Query {
  constructor(public readonly userId: string) {
    super();
  }
}
