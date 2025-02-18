import { CordsCountType, Product, ProductType } from '../../types/types';

export class UpdateProductDto implements Omit<Product, 'id'> {
  name!: string;
  describe!: string;
  createdAt!: Date;
  photoPath!: string;
  productType!: ProductType;
  article!: string;
  cordsCount!: CordsCountType;
  price!: number;
}
