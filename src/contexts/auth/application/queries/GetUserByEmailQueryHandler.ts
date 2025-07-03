import { GetUserByEmailQuery } from '@contexts/auth/domain/GetUserByEmailQuery';
import { Query } from '@contexts/shared/domain/cqrs/Query';
import { QueryHandler } from '@contexts/shared/domain/cqrs/QueryHandler';
import { User } from '@contexts/auth/domain/User';
import { UserEmail } from '@contexts/auth/domain/UserEmail';
import { UserFinder } from '../cases/UserFinder';

export class GetUserByEmailQueryHandler implements QueryHandler<GetUserByEmailQuery, User> {
  constructor(private readonly userFinder: UserFinder) {}

  subscribedTo(): Query {
    return GetUserByEmailQuery;
  }

  async handle(query: GetUserByEmailQuery): Promise<User> {
    const email = new UserEmail(query.email);

    const user = await this.userFinder.run(email);

    if (!user) throw new Error('User not found');

    return user;
  }
}
