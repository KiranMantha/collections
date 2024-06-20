import { JWTGuard } from '@guards/auth.guard';
import { RefreshJwtGuard } from '@guards/refreshJwt.guard';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, JWTGuard, RefreshJwtGuard]
})
export class UserModule {}
