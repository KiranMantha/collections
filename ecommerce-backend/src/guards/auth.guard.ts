import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractAuthToken(request);
    if (!token)
      throw new UnauthorizedException(
        'Missing Authorization header with Bearer token'
      );

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET_KEY')
      });
      request['user'] = payload;
    } catch (e) {
      throw new UnauthorizedException('Invalid Bearer token');
    }
    return true;
  }

  private extractAuthToken(request: Request) {
    if (!request.headers) {
      return undefined;
    }

    if (!request.headers['authorization']) {
      return undefined;
    }

    const [type, token] = request.headers['authorization'].split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }
}
