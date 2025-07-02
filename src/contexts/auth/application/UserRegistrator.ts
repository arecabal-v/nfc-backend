import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class UserRegistrator {
  constructor(private readonly userRepository: UserRepository) {}

  async run(user: User): Promise<void> {
    return this.userRepository.save(user);
  }
}
