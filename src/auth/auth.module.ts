import { Module, OnModuleInit } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '3600s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService],
})
export class AuthModule implements OnModuleInit {
  onModuleInit() {
    console.log('Auth module');
  }
}
