export interface JwtPayload {
  userId: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface JwtService {
  generateTokenPair(payload: Omit<JwtPayload, 'iat' | 'exp'>): TokenPair;
  generateAccessToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string;
  generateRefreshToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string;
  verifyToken(token: string): JwtPayload;
}
