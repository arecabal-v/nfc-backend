import { Query } from '../../shared/domain/cqrs/Query';
import { User } from './User';

export class GenerateTokenFromUserQuery extends Query {
  readonly user: User;

  constructor(user: User) {
    super();
    this.user = user;
  }
}
