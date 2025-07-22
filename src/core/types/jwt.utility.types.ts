import { JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export function getJwtOptions(
  config: ConfigService,
  type: 'access' | 'refresh' = 'access',
): JwtSignOptions {
  return {
    secret: config.get<string>(`JWT_${type.toUpperCase()}_KEY`),
    expiresIn: config.get<string>(`JWT_${type.toUpperCase()}_EXPIN`),
  };
}
export type JwtPayloadType = {
  id: string;
};

export type tokenType = 'access' | 'refresh';

export const enum TokenEnumType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}
