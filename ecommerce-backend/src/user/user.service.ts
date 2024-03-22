import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@schema/user.schema';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(user: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser && (await compare(user.password, existingUser.password))) {
      const payload = {
        name: existingUser.name,
        email: existingUser.email,
        sub: existingUser.id
      };
      const jwtSecret = this.configService.get<string>('JWT_SECRET_KEY');
      return {
        token: await this.jwtService.signAsync(payload, { secret: jwtSecret })
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async createUser(newUser: {
    username: string;
    email: string;
    password: string;
  }): Promise<{ name: string; email: string }> {
    const registeredUser = await this.userModel.create({
      name: newUser.username,
      email: newUser.email,
      password: await hash(newUser.password, 10),
      isAdmin: false
    });
    const { name, email } = registeredUser;
    return { name, email };
  }
}
