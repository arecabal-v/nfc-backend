import { GenerateTokenQuery } from '@contexts/auth/domain/GenerateTokenQuery';
import { Query } from '@contexts/shared/domain/cqrs/Query';
import { QueryHandler } from '@contexts/shared/domain/cqrs/QueryHandler';
import { JwtService, TokenPair } from '@contexts/shared/domain/jwt/JwtService';

export class GenerateTokenQueryHandler implements QueryHandler<GenerateTokenQuery, TokenPair> {
  constructor(private readonly jwtService: JwtService) {}

  subscribedTo(): Query {
    return GenerateTokenQuery;
  }

  async handle(query: GenerateTokenQuery): Promise<TokenPair> {
    return this.jwtService.generateTokenPair({
      userId: query.userId,
      email: query.email,
      name: query.name,
    });
  }
}
