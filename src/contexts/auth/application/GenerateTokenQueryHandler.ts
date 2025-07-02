import { Query } from '../../shared/domain/cqrs/Query';
import { QueryHandler } from '../../shared/domain/cqrs/QueryHandler';
import { GenerateTokenQuery } from '../domain/GenerateTokenQuery';
import { JwtService, TokenPair } from '../../shared/domain/jwt/JwtService';

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
