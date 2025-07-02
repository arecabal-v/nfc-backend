import { Command } from '@contexts/shared/domain/cqrs/Command';
import { CommandHandler } from '@contexts/shared/domain/cqrs/CommandHandler';
import { CommandNotRegisteredError } from '@contexts/shared/domain/cqrs/CommandNotRegisteredError';

export class CommandHandlers extends Map<Command, CommandHandler<Command>> {
  constructor(commandHandlers: Array<CommandHandler<Command>>) {
    super();

    commandHandlers.forEach((commandHandler) => {
      this.set(commandHandler.subscribedTo(), commandHandler);
    });
  }

  public get(command: Command): CommandHandler<Command> {
    const commandHandler = super.get(command.constructor);

    if (!commandHandler) {
      throw new CommandNotRegisteredError(command);
    }

    return commandHandler;
  }
}
