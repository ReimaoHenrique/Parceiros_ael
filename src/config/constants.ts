import { UnauthorizedException } from '@nestjs/common';

/**
 * Segredo usado para verificar os access tokens emitidos pela
 * API de autenticacao (nestjs_auth_ael). Precisa ser o MESMO JWT_SECRET.
 */
export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new UnauthorizedException('JWT_SECRET nao configurado no servidor');
  }

  return secret;
}
