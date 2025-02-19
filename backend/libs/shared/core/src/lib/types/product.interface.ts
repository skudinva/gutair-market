import { ProductType } from '../interfaces/product-type.interface';
import { CordsCountType } from './cords-count.interface';

export interface Product {
  id: string;
  name: string;
  describe: string;
  createdAt: Date;
  photoPath: string;
  productType: ProductType;
  article: string;
  cordsCount: CordsCountType;
  price: number;
}
