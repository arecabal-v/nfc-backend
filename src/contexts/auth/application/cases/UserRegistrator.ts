import { User } from '@contexts/auth/domain/User';
import { UserRepository } from '@contexts/auth/domain/UserRepository';
import { BadRequestError } from '@contexts/shared/domain/errors/BadRequestError';

export class UserRegistrator {
  constructor(private readonly userRepository: UserRepository) {}

  async run(user: User): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser) throw new BadRequestError('Invalid registration data');

    return this.userRepository.save(user);
  }
}
