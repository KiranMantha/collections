import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@schema/user.schema';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private jwtSecret: string;
  private jwtRefreshSecret: string;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET_KEY');
    this.jwtRefreshSecret = this.configService.get<string>(
      'JWT_REFRESH_SECRET_KEY'
    );
  }

  async validateUser(user: { email: string; password: string }): Promise<{
    token: string;
    refreshToken: string;
  }> {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser && (await compare(user.password, existingUser.password))) {
      const payload = {
        sub: existingUser.id,
        name: existingUser.name,
        email: existingUser.email
      };
      return {
        token: await this.jwtService.signAsync(payload, {
          secret: this.jwtSecret,
          expiresIn: '20s'
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          secret: this.jwtRefreshSecret,
          expiresIn: '1h'
        })
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async refreshToken(user: {
    id: string;
    name: string;
    email: string;
  }): Promise<{ token: string; refreshToken: string }> {
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email
    };

    return {
      token: await this.jwtService.signAsync(payload, {
        secret: this.jwtSecret,
        expiresIn: '20s'
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: this.jwtRefreshSecret,
        expiresIn: '1h'
      })
    };
  }

  async createUser(newUser: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ name: string; email: string }> {
    const registeredUser = await this.userModel.create({
      name: newUser.name,
      email: newUser.email,
      password: await hash(newUser.password, 10),
      isAdmin: false
    });
    const { name, email } = registeredUser;
    return { name, email };
  }

  async getUser(id: string) {
    return this.userModel.findById(id);
  }
}
