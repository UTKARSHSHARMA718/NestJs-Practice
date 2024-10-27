import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { UserDetails } from './user.interface';

@Injectable() // this service can be used inside other files as well in form of dependency injection.
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async createUser(name: string, email: string, password: string) {
    const newUser = await this.userModel.create({
      name,
      email,
      password,
    });
    return newUser.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findAll() {
    return this.userModel.find({}).exec();
  }
}
