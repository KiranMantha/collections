import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token)
      throw new UnauthorizedException(
        'Authorization header with Refresh token is missing'
      );

    try {
      console.log('***** refreshtoken guard', token);
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET_KEY
      });
      console.log('***** refreshtoken guard', payload);
      request['user'] = payload;
    } catch (e) {
      console.log('***** refreshtoken guard error', e);
      throw new UnauthorizedException(e);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    if (!request.headers) {
      return undefined;
    }

    if (!request.headers['authorization']) {
      return undefined;
    }

    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Refresh' ? token : undefined;
  }
}
