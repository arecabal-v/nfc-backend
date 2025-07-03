import { User } from './User';
import { UserEmail } from './UserEmail';

export interface UserRepository {
  save(user: User): Promise<void>;
  findByEmail(email: UserEmail): Promise<User | null>;
}
