import { Body, Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post()
  createUser(@Body('name') name: string) {}
}
