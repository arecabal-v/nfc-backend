import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { BaseController } from '@app/controllers/BaseController';
import { CommandBus } from '@contexts/shared/domain/cqrs/CommandBus';
import { QueryBus } from '@contexts/shared/domain/cqrs/QueryBus';
import { GetUserByEmailQuery } from '@contexts/auth/domain/GetUserByEmailQuery';
import { ValidateUserPasswordCommand } from '@contexts/auth/domain/ValidateUserPasswordCommand';
import { GenerateTokenFromUserQuery } from '@contexts/auth/domain/GenerateTokenFromUserQuery';

import { TokenPair } from '@contexts/shared/domain/jwt/JwtService';
import { User } from '@contexts/auth/domain/User';

export default class PostLoginController implements BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    const getUserQuery = new GetUserByEmailQuery(email);
    const user = await this.queryBus.ask(getUserQuery) as User;

    const validatePasswordCommand = new ValidateUserPasswordCommand(user, password);
    await this.commandBus.dispatch(validatePasswordCommand);

    const generateTokenQuery = new GenerateTokenFromUserQuery(user);
    const { accessToken, refreshToken } = await this.queryBus.ask(generateTokenQuery) as TokenPair;

    res.status(httpStatus.OK).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
    });
  }
}
