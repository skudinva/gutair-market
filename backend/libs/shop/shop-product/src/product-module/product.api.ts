import { CordsCountType, Product } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';

export class ProductApi implements Product {
  @ApiProperty({ description: 'ID продукта', example: '1' })
  id: string;

  @ApiProperty({ description: 'Название продукта', example: 'Product Name' })
  name: string;

  @ApiProperty({
    description: 'Описание продукта',
    example: 'Product description',
  })
  describe: string;

  @ApiProperty({ description: 'Дата создания', example: new Date() })
  createdAt: Date;

  @ApiProperty({
    description: 'Путь к фото продукта',
    example: '/path/to/photo',
  })
  photoPath: string;

  @ApiProperty({
    description: 'Тип продукта',
    enum: ProductType,
  })
  productType: ProductType;

  @ApiProperty({ description: 'Артикул продукта', example: '123456' })
  article: string;

  @ApiProperty({ description: 'Количество кордов', example: 6 })
  cordsCount: CordsCountType;

  @ApiProperty({ description: 'Цена продукта', example: 19.99 })
  price: number;
}
