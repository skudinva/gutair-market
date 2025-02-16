import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';
import { IsIn } from 'class-validator';

export class CreateProductDto {
  id: string;
  name: string;
  describe: string;
  createdAt: Date;
  photoPath: string;

  @ApiProperty({
    description: 'Product type',
    example: 'Video',
    enum: ProductType,
    enumName: 'ProductType',
  })
  @IsIn(Object.values(ProductType))
  productType!: ProductType;

  article: string;
  cordsCount: number;
  price: number;
}
