import { TransformToArray, TransformToNumberArray } from '@backend/helpers';
import {
  CORDS_COUNT,
  CordsCountType,
  SortDirection,
  SortType,
} from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsOptional } from 'class-validator';
import {
  DEFAULT_PAGE_COUNT,
  DEFAULT_PRODUCT_COUNT_LIMIT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SORT_TYPE,
} from './product.constant';

export class ProductQuery {
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
    isArray: true,
  })
  @IsIn(Object.values(ProductType), { each: true })
  @IsOptional()
  @IsArray()
  @TransformToArray()
  productType!: ProductType[];

  @ApiProperty({
    description: 'Cords counts',
    example: CORDS_COUNT[0],
    enum: CORDS_COUNT,
    required: false,
    isArray: true,
  })
  @IsIn(CORDS_COUNT, { each: true })
  @IsOptional()
  @IsArray()
  @TransformToNumberArray()
  cordsCount!: CordsCountType[];
}
