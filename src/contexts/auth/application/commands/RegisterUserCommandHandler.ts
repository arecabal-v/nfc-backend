import { RegisterUserCommand } from '@contexts/auth/domain/RegisterUserCommand';
import { Command } from '@contexts/shared/domain/cqrs/Command';
import { CommandHandler } from '@contexts/shared/domain/cqrs/CommandHandler';
import { UserId } from '@contexts/shared/domain/UserId';
import { UserRegistrator } from '../cases/UserRegistrator';
import { UserEmail } from '@contexts/auth/domain/UserEmail';
import { UserPassword } from '@contexts/auth/domain/UserPassword';
import { UserName } from '@contexts/auth/domain/UserName';
import { User } from '@contexts/auth/domain/User';

export class RegisterUserCommandHandler implements CommandHandler<RegisterUserCommand> {
  constructor(private readonly userRegistrator: UserRegistrator) {}

  subscribedTo(): Command {
    return RegisterUserCommand;
  }

  async handle(command: RegisterUserCommand): Promise<void> {
    const id = new UserId(command.userId);
    const email = new UserEmail(command.email);
    const password = new UserPassword(command.password);
    const name = new UserName(command.name);

    const user = User.create(id, email, password, name);
    await this.userRegistrator.run(user);
  }
}
