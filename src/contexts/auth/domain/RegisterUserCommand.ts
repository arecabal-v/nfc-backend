import { Command } from '../../shared/domain/cqrs/Command';

export class RegisterUserCommand implements Command {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
  ) {}
}
