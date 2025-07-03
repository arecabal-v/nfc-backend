import { Query } from '../../shared/domain/cqrs/Query';

export class GetUserByEmailQuery extends Query {
  constructor(public readonly email: string) {
    super();
  }
}
