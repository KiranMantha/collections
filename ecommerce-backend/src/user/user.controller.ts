import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('signin')
  signIn() {
    return {};
  }

  @Post('signin')
  getUserByEmail(@Body() user: { email: string }): Promise<User> {
    return this.userService.getUserByEmail(user.email);
  }

  @Post('register')
  createUser(
    @Body() newUser: { username: string; email: string; password: string }
  ): Promise<{ name: string; email: string }> {
    return this.userService.createUser(newUser);
  }
}
