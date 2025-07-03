import { Command } from '../../shared/domain/cqrs/Command';

export class LoginUserCommand implements Command {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
