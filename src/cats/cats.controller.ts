import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CustomPipeValidation } from 'src/validations/customPipeValidation';
import { catSchema, CreateCatDTO } from 'src/validations/zodSchema';

@Controller('cats')
// @UseGuards(AuthGuard) // guard at controller level
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Post()
  @UsePipes(new CustomPipeValidation(catSchema))
  createCat(@Body() cat: CreateCatDTO) {
    const { name, price, description } = cat;
    return this.catService.create(name, price, description);
  }

  @UseGuards(AuthGuard) // guard at route level
  @Get()
  findAllCats() {
    return this.catService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.catService.findOne(id);
  }

  @Put('/:id')
  UpdateOne(
    @Param('id') id: string,
    @Body('price') price?: number,
    @Body('description') description?: string,
  ) {
    return this.catService.updateOne(id, price, description);
  }
}
