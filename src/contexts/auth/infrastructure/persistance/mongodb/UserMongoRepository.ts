import { User } from '@contexts/auth/domain/User';
import { UserRepository } from '@contexts/auth/domain/UserRepository';
import { UserEmail } from '@contexts/auth/domain/UserEmail';
import { UserPassword } from '@contexts/auth/domain/UserPassword';
import { UserName } from '@contexts/auth/domain/UserName';
import { UserId } from '@contexts/shared/domain/UserId';
import { MongoRepository } from '@contexts/shared/infrastructure/persistance/mongo/MongoRepository';

interface UserDocument {
  _id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserMongoRepository extends MongoRepository<User> implements UserRepository {
  async save(user: User): Promise<void> {
    await this.persist(user.id.value, user);
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    const collection = await this.collection();
    const document = await collection.findOne<UserDocument>({ email: email.value });

    if (!document) return null;

    return this.documentToAggregate(document);
  }

  private documentToAggregate(document: UserDocument): User {
    const id = new UserId(document._id);
    const email = new UserEmail(document.email);
    const password = new UserPassword(document.password, true);
    const name = new UserName(document.name);

    return User.create(id, email, password, name);
  }

  protected moduleName(): string {
    return 'users';
  }
}
