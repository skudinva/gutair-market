import { ProductType } from '@prisma/client';

export interface Product {
  id: string;
  name: string;
  describe: string;
  createdAt: Date;
  photoPath: string;
  productType: ProductType;
  article: string;
  cordsCount: number;
  price: number;
}
