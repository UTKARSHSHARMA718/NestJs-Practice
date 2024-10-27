import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;
      if (!authorization || authorization?.trim() === '') {
        throw new UnauthorizedException('You are not authorized!');
      }

      const authToken = authorization?.split(' ')?.[1];
      const isTokenValid = await this.authService.validateToken(authToken);

      request.user = isTokenValid;
      return true;
    } catch (error) {
      console.log('auth error - ', error);
      throw new ForbiddenException(
        error.message || 'session expired! Please sign In',
      );
    }
  }
}
