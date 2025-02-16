import { ProductType } from './product-type.enum';

export interface Product {
  id: number;
  name: string;
  describe: string;
  createdAt: Date;
  photoPath: string;
  productType: ProductType;
  article: string;
  cordsCount: number;
}
