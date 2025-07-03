import { Query } from '@contexts/shared/domain/cqrs/Query';

export class GetNfcTagByIdQuery extends Query {
  constructor(public readonly id: string) {
    super();
  }
}
