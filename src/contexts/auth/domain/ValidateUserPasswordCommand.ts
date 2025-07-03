import { Command } from '../../shared/domain/cqrs/Command';
import { User } from './User';

export class ValidateUserPasswordCommand implements Command {
  constructor(
    public readonly user: User,
    public readonly password: string,
  ) {}
}
