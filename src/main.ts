import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  // Note: Correct way of declaring guards globally
  // app.useGlobalGuards(app.get(AuthGuard));
  await app.listen(3000);
}
bootstrap();
