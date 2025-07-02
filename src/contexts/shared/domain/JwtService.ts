export interface JwtPayload {
  userId: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

export interface JwtService {
  generateToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string;
  verifyToken(token: string): JwtPayload;
}
