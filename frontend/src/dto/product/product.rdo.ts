import { ProductType } from '../../const';
import { CordsCountType, Product } from '../../types/types';

export class ProductRdo implements Product {
  id!: string;
  name!: string;
  describe!: string;
  createdAt!: Date;
  photoPath!: string;
  productType!: ProductType;
  article!: string;
  cordsCount!: CordsCountType;
  price!: number;
}
