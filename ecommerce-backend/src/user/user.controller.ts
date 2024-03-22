import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('signin')
  signIn() {
    return {};
  }

  @Post('signin')
  validateUser(
    @Body() user: { email: string; password: string }
  ): Promise<{ token: string }> {
    return this.userService.validateUser(user);
  }

  @Post('register')
  createUser(
    @Body() newUser: { username: string; email: string; password: string }
  ): Promise<{ name: string; email: string }> {
    return this.userService.createUser(newUser);
  }
}
