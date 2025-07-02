import { AggregateRoot } from '../../shared/domain/AggregateRoot';
import { UserId } from './UserId';
import { UserEmail } from './UserEmail';
import { UserPassword } from './UserPassword';
import { UserName } from './UserName';

export class User extends AggregateRoot {
  constructor(
    private readonly _id: UserId,
    private readonly _email: UserEmail,
    private readonly _password: UserPassword,
    private readonly _name: UserName,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) {
    super();
  }

  static create(
      id: UserId,
      email: UserEmail,
      password: UserPassword,
      name: UserName,
  ): User {
    const now = new Date();
    return new User(id, email, password, name, now, now);
  }

  get id(): UserId {
    return this._id;
  }

  get email(): UserEmail {
    return this._email;
  }

  get password(): UserPassword {
    return this._password;
  }

  get name(): UserName {
    return this._name;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  toPrimitives() {
    return {
      id: this._id.value,
      email: this._email.value,
      password: this._password.value,
      name: this._name.value,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
