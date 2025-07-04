import { Request, Response, NextFunction } from 'express';
import { JwtService, JwtPayload } from '@contexts/shared/domain/jwt/JwtService';
import { UnauthorizedError } from '@contexts/shared/domain/errors/UnauthorizedError';

declare module 'express' {
  export interface Request {
    tokenPayload?: JwtPayload;
  }
}

export class AuthMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new UnauthorizedError('Authorization header is required');

    const token = this.extractTokenFromHeader(authHeader);

    if (!token) throw new UnauthorizedError('Bearer token is required');

    req.tokenPayload = this.jwtService.verifyToken(token);
    next();
  };

  private extractTokenFromHeader(authHeader: string): string | null {
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    return parts[1];
  }
}
