import { User } from '@contexts/auth/domain/User';
import { UserRepository } from '@contexts/auth/domain/UserRepository';
import { MongoRepository } from '@contexts/shared/infrastructure/persistance/mongo/MongoRepository';

export class UserMongoRepository extends MongoRepository<User> implements UserRepository {
  async save(user: User): Promise<void> {
    await this.persist(user.id.value, user);
  }

  protected moduleName(): string {
    return 'users';
  }
}
