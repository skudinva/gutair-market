import { Entity, Product, StorableEntity } from '@backend/shared/core';
import { ProductType } from '@prisma/client';

export class ShopProductEntity
  extends Entity
  implements StorableEntity<Product>
{
  public name!: string;
  public describe!: string;
  public createdAt!: Date;
  public photoPath!: string;
  public productType!: ProductType;
  public article!: string;
  public cordsCount!: number;
  public price!: number;

  constructor(product?: Product) {
    super();
    this.populate(product);
  }
  public populate(product?: Product): void {
    if (!product) {
      return;
    }
    const {
      id,
      productType,
      createdAt,
      article,
      name,
      describe,
      photoPath,
      cordsCount,
      price,
    } = product;

    this.id = id ?? undefined;
    this.name = name;
    this.describe = describe;
    this.createdAt = createdAt;
    this.photoPath = photoPath;
    this.productType = productType;
    this.article = article;
    this.cordsCount = cordsCount;
    this.price = price;
  }

  toPOJO(): Product {
    return {
      id: this.id,
      name: this.name,
      describe: this.describe,
      createdAt: this.createdAt,
      photoPath: this.photoPath,
      productType: this.productType,
      article: this.article,
      cordsCount: this.cordsCount,
      price: this.price,
    };
  }
}
