import { Command } from '@contexts/shared/domain/cqrs/Command';
import { CommandHandler } from '@contexts/shared/domain/cqrs/CommandHandler';
import { ValidateUserPasswordCommand } from '@contexts/auth/domain/ValidateUserPasswordCommand';
import { UserPassword } from '@contexts/auth/domain/UserPassword';

export class ValidateUserPasswordCommandHandler implements CommandHandler<ValidateUserPasswordCommand> {
  constructor() {}

  subscribedTo(): Command {
    return ValidateUserPasswordCommand;
  }

  async handle(command: ValidateUserPasswordCommand): Promise<void> {
    const isValid = UserPassword.verify(command.password, command.user.password.value);

    if (!isValid) throw new Error('Invalid credentials');
  }
}
