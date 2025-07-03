import { User } from '@contexts/auth/domain/User';
import { UserRepository } from '@contexts/auth/domain/UserRepository';

export class UserRegistrator {
  constructor(private readonly userRepository: UserRepository) {}

  async run(user: User): Promise<void> {
    return this.userRepository.save(user);
  }
}
