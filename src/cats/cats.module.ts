import { Module, OnModuleInit } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from './cats.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }]),
    AuthModule,
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule implements OnModuleInit {
  onModuleInit() {
    console.log('Controller module');
  }
}
