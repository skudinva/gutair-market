import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import 'multer';
import { UpdateProductDto } from './update-product.dto';

export class UpdateProductFileDto {
  @ApiProperty({
    description: 'photo file',
    type: 'string',
    format: 'binary',
    required: false,
  })
  public file?: Express.Multer.File;

  @ValidateNested()
  @Type(() => UpdateProductDto)
  @ApiProperty()
  product: UpdateProductDto;
}
