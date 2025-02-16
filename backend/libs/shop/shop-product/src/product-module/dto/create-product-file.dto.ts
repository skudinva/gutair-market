import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import 'multer';
import { CreateProductDto } from './create-product.dto';

export class CreateProductFileDto {
  @ApiProperty({
    description: 'photo file',
    type: 'string',
    format: 'binary',
    required: false,
  })
  public file?: Express.Multer.File;

  @ValidateNested()
  @Type(() => CreateProductDto)
  @ApiProperty()
  product: CreateProductDto;
}
