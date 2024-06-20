import { JWTGuard } from '@guards/auth.guard';
import { RefreshJwtGuard } from '@guards/refreshJwt.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  validateUser(@Body() user: { email: string; password: string }): Promise<{
    token: string;
    refreshToken: string;
  }> {
    return this.userService.validateUser(user);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    console.log('refreshed');
    return await this.userService.refreshToken(req.user);
  }

  @Post('register')
  createUser(
    @Body() newUser: { name: string; email: string; password: string }
  ): Promise<{ name: string; email: string }> {
    return this.userService.createUser(newUser);
  }

  @UseGuards(JWTGuard)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
}
