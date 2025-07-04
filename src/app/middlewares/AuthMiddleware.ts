import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { JwtService, JwtPayload } from '@contexts/shared/domain/jwt/JwtService';

declare module 'express' {
  export interface Request {
    tokenPayload?: JwtPayload;
  }
}

export class AuthMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        res.status(httpStatus.UNAUTHORIZED).json({
          error: 'Authorization header is required',
        });
        return;
      }

      const token = this.extractTokenFromHeader(authHeader);

      if (!token) {
        res.status(httpStatus.UNAUTHORIZED).json({
          error: 'Bearer token is required',
        });
        return;
      }

      req.tokenPayload = this.jwtService.verifyToken(token);
      next();
    } catch (error) {
      res.status(httpStatus.UNAUTHORIZED).json({
        error: 'Invalid or expired token',
      });
    }
  };

  private extractTokenFromHeader(authHeader: string): string | null {
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    return parts[1];
  }
}
