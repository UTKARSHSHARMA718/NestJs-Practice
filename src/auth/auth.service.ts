import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.services';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dtos/newUser.dto';
import { IError } from './auth.interface';
import { UserDetails } from 'src/user/user.interface';
import { ExistingUserDTO } from 'src/user/dtos/existingUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  hashPassword(password: string) {
    return bcrypt.hash(password, 13);
  }

  async register(user: Readonly<NewUserDTO>): Promise<IError | UserDetails> {
    const existingUser = await this.userService.findByEmail(user.email);

    if (existingUser) {
      return { error: 'User already exist!' };
    }

    const hashedPassword = await this.hashPassword(user.password);
    const newUser = await this.userService.createUser(
      user.name,
      user.email,
      hashedPassword,
    );

    return this.userService._getUserDetails(newUser);
  }

  async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async login(user: Readonly<ExistingUserDTO>) {
    const { password, email } = user;

    const userExist = await this.userService.findByEmail(email);
    if (!userExist) {
      throw new NotFoundException('User does not exist!');
    }

    const isPasswordSame = this.comparePasswords(password, user.password);

    if (!isPasswordSame) {
      throw new UnprocessableEntityException('Wrong email or password!');
    }

    const token = await this.jwtService.signAsync({ email, password });
    return { token, message: 'User logged in successfully!' };
  }

  validateToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
