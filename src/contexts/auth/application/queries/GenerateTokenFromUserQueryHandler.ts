import { GenerateTokenFromUserQuery } from '@contexts/auth/domain/GenerateTokenFromUserQuery';
import { Query } from '@contexts/shared/domain/cqrs/Query';
import { QueryHandler } from '@contexts/shared/domain/cqrs/QueryHandler';
import { JwtService, TokenPair } from '@contexts/shared/domain/jwt/JwtService';

export class GenerateTokenFromUserQueryHandler implements QueryHandler<GenerateTokenFromUserQuery, TokenPair> {
  constructor(private readonly jwtService: JwtService) {}

  subscribedTo(): Query {
    return GenerateTokenFromUserQuery;
  }

  async handle(query: GenerateTokenFromUserQuery): Promise<TokenPair> {
    return this.jwtService.generateTokenPair({
      userId: query.user.id.value,
      email: query.user.email.value,
      name: query.user.name.value,
    });
  }
}
