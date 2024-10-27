import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class CustomPipeValidation implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  /**
   * The below function will only run after we have validate the request successfully.
   * @param value
   * @param metadata
   * @returns
   */
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      console.log({ value, metadata, parsedValue });
      return parsedValue;
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}
