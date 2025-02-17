import { CordsCountType, FieldValidate } from '@backend/shared/core';
import { ProductType } from '@prisma/client';
import {
  IsIn,
  IsInt,
  IsISO8601,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { ProductApi } from '../product.api';

export class BaseProductDto extends ProductApi {
  @IsString()
  id: string;

  @IsString()
  @Length(
    FieldValidate.MinProductNameLength,
    FieldValidate.MaxProductNameLength
  )
  name: string;

  @IsString()
  @Length(
    FieldValidate.MinProductDescribeLength,
    FieldValidate.MaxProductDescribeLength
  )
  describe: string;

  @IsISO8601()
  createdAt: Date;

  @IsString()
  photoPath: string;

  @IsIn(Object.values(ProductType))
  productType: ProductType;

  @IsString()
  @Length(
    FieldValidate.MinProductArticleLength,
    FieldValidate.MaxProductArticleLength
  )
  article: string;

  @IsInt()
  cordsCount: CordsCountType;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(FieldValidate.MinProductPrice)
  @Max(FieldValidate.MaxProductPrice)
  price: number;
}
