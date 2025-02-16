import { ApiProperty } from '@nestjs/swagger';
import { ProductState, ProductType } from '@prisma/client';
import { IsIn, IsISO8601, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsIn(Object.values(ProductType))
  @IsOptional()
  @ApiProperty({
    description: 'Product type',
    example: 'Video',
    enum: ProductType,
    enumName: 'ProductType',
  })
  productType?: ProductType;

  userId?: string;

  @IsIn(Object.values(ProductState))
  @IsOptional()
  @ApiProperty({
    description: 'Product state',
    example: 'Published',
    enum: ProductState,
    enumName: 'ProductState',
  })
  state?: ProductState;

  @IsISO8601()
  @IsOptional()
  @ApiProperty({ description: 'Date of publication' })
  publicDate?: Date;
}
