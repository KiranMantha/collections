import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  findOne(@Body() body: { email: string }): Promise<User> {
    return this.userService.findOne(body.email);
  }
}
