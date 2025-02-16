import { SortDirection, SortType } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsIn, IsMongoId, IsOptional, IsString } from 'class-validator';
import {
  DEFAULT_PAGE_COUNT,
  DEFAULT_POST_COUNT_LIMIT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SORT_TYPE,
} from './shop-product.constant';

export class ShopProductQuery {
  public limit: number = DEFAULT_POST_COUNT_LIMIT;

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

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'search',
    required: false,
  })
  public search?: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Author id of the product',
    example: '677cd8d75ff92067f1de5911',
  })
  productUserId: string;

  @ApiProperty({
    description: 'Product type',
    example: 'Video',
    enum: ProductType,
    enumName: 'ProductType',
    required: false,
  })
  @IsIn(Object.values(ProductType))
  @IsOptional()
  productType!: ProductType;

  @IsString()
  @IsMongoId()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'id of login user',
    example: '677cd8d75ff92067f1de5911',
  })
  userId?: string;
}
