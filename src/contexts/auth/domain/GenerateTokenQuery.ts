import { Query } from '../../shared/domain/cqrs/Query';

export class GenerateTokenQuery extends Query {
  readonly userId: string;
  readonly email: string;
  readonly name: string;

  constructor(userId: string, email: string, name: string) {
    super();
    this.userId = userId;
    this.email = email;
    this.name = name;
  }
}
