import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { BaseController } from '@app/controllers/BaseController';
import { QueryBus } from '@contexts/shared/domain/cqrs/QueryBus';
import { GenerateTokenQuery } from '@contexts/auth/domain/GenerateTokenQuery';
import { TokenPair } from '@contexts/shared/domain/jwt/JwtService';

export default class GetRefreshTokenController implements BaseController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  async run(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { userId, email, name } = req.tokenPayload!;

    const generateTokenQuery = new GenerateTokenQuery(userId, email, name);
    const tokens = await this.queryBus.ask(generateTokenQuery) as TokenPair;

    res.status(httpStatus.OK).json({
      message: 'Tokens refreshed successfully',
      ...tokens,
    });
  }
}
