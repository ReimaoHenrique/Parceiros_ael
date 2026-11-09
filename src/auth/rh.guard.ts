import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { AuthenticatedRequest } from './jwt-auth.guard';

/**
 * Libera a rota apenas para usuarios com a tag `rh`
 * (aceita 'rh' ou 'RH', independente de maiusculas).
 */
@Injectable()
export class RhGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    if (context.getType() !== 'http') {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    const hasRhTag =
      Array.isArray(user?.tags) &&
      user.tags.some((tag) => tag.toLowerCase() === 'rh');

    if (!hasRhTag) {
      throw new ForbiddenException(
        'Apenas usuarios com a tag rh podem acessar esta rota',
      );
    }

    return true;
  }
}
