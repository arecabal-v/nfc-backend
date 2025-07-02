
import { Command } from '@contexts/shared/domain/cqrs/Command';
import { CommandHandler } from '../../shared/domain/cqrs/CommandHandler';
import { RegisterUserCommand } from '../domain/RegisterUserCommand';
import { UserRegistrator } from './UserRegistrator';
import { UserEmail } from '../domain/UserEmail';
import { UserPassword } from '../domain/UserPassword';
import { UserName } from '../domain/UserName';
import { User } from '../domain/User';
import { UserId } from '@contexts/shared/domain/UserId';

export class RegisterUserCommandHandler implements CommandHandler<RegisterUserCommand> {
  constructor(private readonly userRegistrator: UserRegistrator) {}

  subscribedTo(): Command {
    return RegisterUserCommand;
  }

  async handle(command: RegisterUserCommand): Promise<void> {
    const id = UserId.random();
    const email = new UserEmail(command.email);
    const password = new UserPassword(command.password);
    const name = new UserName(command.name);

    const user = User.create(id, email, password, name);
    await this.userRegistrator.run(user);
  }
}
