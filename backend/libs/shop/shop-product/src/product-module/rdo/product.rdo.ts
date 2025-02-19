import { CordsCountType, ProductType } from '@backend/shared/core';
import { Expose } from 'class-transformer';
import { ProductApi } from '../product.api';

export class ProductRdo extends ProductApi {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  describe: string;

  @Expose()
  createdAt: Date;

  @Expose()
  photoPath: string;

  @Expose()
  productType: ProductType;

  @Expose()
  article: string;

  @Expose()
  cordsCount: CordsCountType;

  @Expose()
  price: number;
}
