import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private User: Model<UserDocument>,
  ) { }

  async findOneByEmail(email: string): Promise<UserDocument> {
    return this.User.findOne({ email }).exec();
  }

  async createUser(user: User): Promise<User> {
    const createdUser = new this.User(user);
    return createdUser.save();
  }
}
