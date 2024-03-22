import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async createUser(newUser: {
    username: string;
    email: string;
    password: string;
  }): Promise<{ name: string; email: string }> {
    const registeredUser = await this.userModel.create({
      name: newUser.username,
      email: newUser.email,
      password: newUser.password,
      isAdmin: false
    });
    const { name, email } = registeredUser;
    return { name, email };
  }
}
