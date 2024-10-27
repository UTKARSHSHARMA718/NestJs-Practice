import { Module, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.services';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements OnModuleInit {
  onModuleInit() {
    console.log('User module started');
  }
}
