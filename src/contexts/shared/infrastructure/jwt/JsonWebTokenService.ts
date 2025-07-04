import jwt from 'jsonwebtoken';
import { JwtService, JwtPayload, TokenPair } from '../../domain/jwt/JwtService';
import { UnauthorizedError } from '@contexts/shared/domain/errors/UnauthorizedError';

export class JsonWebTokenService implements JwtService {
  constructor(private readonly secret: string) {}

  generateTokenPair(payload: Omit<JwtPayload, 'iat' | 'exp'>): TokenPair {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  generateAccessToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
    return jwt.sign(
        {
          userId: payload.userId,
          email: payload.email,
          name: payload.name,
        },
        this.secret,
        { expiresIn: '24h' },
    );
  }

  generateRefreshToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
    return jwt.sign(
        {
          userId: payload.userId,
          email: payload.email,
          name: payload.name,
        },
        this.secret,
        { expiresIn: '30d' },
    );
  }

  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.secret) as JwtPayload;
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired token');
    }
  }
}
