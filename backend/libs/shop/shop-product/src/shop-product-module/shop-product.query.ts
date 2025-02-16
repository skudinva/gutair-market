import { CordsCount, SortDirection, SortType } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';
import {
  DEFAULT_PAGE_COUNT,
  DEFAULT_PRODUCT_COUNT_LIMIT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SORT_TYPE,
} from './shop-product.constant';

export class ShopProductQuery {
  public limit: number = DEFAULT_PRODUCT_COUNT_LIMIT;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  @ApiProperty({
    description: 'sortDirection',
    enum: SortDirection,
    enumName: 'SortDirection',
  })
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @IsIn(Object.values(SortType))
  @IsOptional()
  @ApiProperty({
    description: 'sortBy',
    enum: SortType,
    enumName: 'SortType',
  })
  public sortBy: SortType = DEFAULT_SORT_TYPE;

  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_PAGE_COUNT)
  @IsOptional()
  @ApiProperty({
    description: 'page',
    example: 1,
  })
  public page: number = DEFAULT_PAGE_COUNT;

  @ApiProperty({
    description: 'Product type',
    example: ProductType.Acoustic,
    enum: ProductType,
    required: false,
  })
  @IsIn(Object.values(ProductType))
  @IsOptional()
  productType!: ProductType;

  @ApiProperty({
    description: 'Cords counts',
    example: CordsCount.Cord6,
    enum: CordsCount,
    required: false,
  })
  @IsIn(Object.values(CordsCount))
  @IsOptional()
  cordsCount: CordsCount;
}
