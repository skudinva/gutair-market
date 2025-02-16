import { ProductType } from '@prisma/client';
import { Expose } from 'class-transformer';
import { ProductApi } from '../product.api';

export class ShopProductRdo extends ProductApi {
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
  cordsCount: number;

  @Expose()
  price: number;
}
