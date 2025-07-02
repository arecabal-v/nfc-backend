import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { BaseController } from '@app/controllers/BaseController';
import { CommandBus } from '@contexts/shared/domain/cqrs/CommandBus';
import { RegisterUserCommand } from '@contexts/auth/domain/RegisterUserCommand';

export default class RegisterController implements BaseController {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { email, password, name } = req.body;

    const command = new RegisterUserCommand(
        email,
        password,
        name,
    );

    await this.commandBus.dispatch(command);

    res.status(httpStatus.CREATED).json({
      message: 'User registered successfully',
    });
  }
}
