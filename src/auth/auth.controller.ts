import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO } from 'src/user/dtos/newUser.dto';
import { Response } from 'express';
import { ExistingUserDTO } from 'src/user/dtos/existingUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() user: NewUserDTO, @Res() res: Response) {
    const errorOrUser = await this.authService.register(user);
    if ('error' in errorOrUser) {
      throw new ConflictException('User already exists!');
    }

    res.json({ message: 'User has been created!', user: errorOrUser });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: ExistingUserDTO) {
    return this.authService.login(user);
  }
}
