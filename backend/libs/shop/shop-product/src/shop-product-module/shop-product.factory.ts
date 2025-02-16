import { EntityFactory, Product } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { CreateProductDto } from './dto/create-product.dto';
import { ShopProductEntity } from './shop-product.entity';

@Injectable()
export class ShopProductFactory implements EntityFactory<ShopProductEntity> {
  create(entityPlainData: Product): ShopProductEntity {
    return new ShopProductEntity(entityPlainData);
  }

  public static createFromCreateProductDto(
    dto: CreateProductDto
  ): ShopProductEntity {
    const newProduct = new ShopProductEntity();
    newProduct.id = undefined;
    newProduct.name = dto.name;
    newProduct.describe = dto.describe;
    newProduct.createdAt = dto.createdAt || dayjs().toDate();
    newProduct.photoPath = dto.photoPath;
    newProduct.productType = dto.productType;
    newProduct.article = dto.article;
    newProduct.cordsCount = dto.cordsCount;
    newProduct.price = dto.price;
    return newProduct;
  }
}
