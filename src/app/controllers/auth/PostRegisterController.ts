import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { BaseController } from '@app/controllers/BaseController';
import { CommandBus } from '@contexts/shared/domain/cqrs/CommandBus';
import { QueryBus } from '@contexts/shared/domain/cqrs/QueryBus';
import { RegisterUserCommand } from '@contexts/auth/domain/RegisterUserCommand';
import { GenerateTokenQuery } from '@contexts/auth/domain/GenerateTokenQuery';
import { UserId } from '@contexts/shared/domain/UserId';
import { TokenPair } from '@contexts/shared/domain/jwt/JwtService';

export default class PostRegisterController implements BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { email, password, name } = req.body;

    const userId = UserId.random().value;

    const command = new RegisterUserCommand(
        userId,
        email,
        password,
        name,
    );

    await this.commandBus.dispatch(command);

    const generateTokenQuery = new GenerateTokenQuery(
        userId,
        email,
        name,
    );

    const tokens = await this.queryBus.ask(generateTokenQuery) as TokenPair;

    res.status(httpStatus.CREATED).json({
      message: 'User registered successfully',
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  }
}
