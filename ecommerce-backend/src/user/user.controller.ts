import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JWTGuard } from 'src/guards/auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JWTGuard)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

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
