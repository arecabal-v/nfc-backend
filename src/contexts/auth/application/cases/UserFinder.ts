import { User } from '@contexts/auth/domain/User';
import { UserEmail } from '@contexts/auth/domain/UserEmail';
import { UserRepository } from '@contexts/auth/domain/UserRepository';

export class UserFinder {
  constructor(private readonly userRepository: UserRepository) {}

  async run(email: UserEmail): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
