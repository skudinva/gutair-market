import { EntityFactory, Product } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductFactory implements EntityFactory<ProductEntity> {
  create(entityPlainData: Product): ProductEntity {
    return new ProductEntity(entityPlainData);
  }

  public static createFromCreateProductDto(
    dto: CreateProductDto
  ): ProductEntity {
    const newProduct = new ProductEntity();
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
