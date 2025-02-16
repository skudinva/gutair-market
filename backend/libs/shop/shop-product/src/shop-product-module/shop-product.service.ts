import { PaginationResult } from '@backend/shared/core';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductState } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ShopProductResponse } from './shop-product.constant';
import { ShopProductEntity } from './shop-product.entity';
import { ShopProductFactory } from './shop-product.factory';
import { ShopProductQuery } from './shop-product.query';
import { ShopProductRepository } from './shop-product.repository';

@Injectable()
export class ShopProductService {
  constructor(private readonly blogProductRepository: ShopProductRepository) {}

  public async createProduct(
    dto: CreateProductDto
  ): Promise<ShopProductEntity> {
    const newProduct = ShopProductFactory.createFromCreateProductDto(dto);
    await this.blogProductRepository.save(newProduct);

    return newProduct;
  }

  public async updateProduct(
    id: string,
    dto: UpdateProductDto
  ): Promise<ShopProductEntity> {
    const existProduct = await this.getProduct(id, dto.userId);

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existProduct[key] !== value) {
        existProduct[key] = value;
      }
    }

    await this.blogProductRepository.update(existProduct);
    return existProduct;
  }

  public async deleteProduct(id: string, userId: string): Promise<void> {
    const product = await this.getProduct(id, null);
    if (!product) {
      return;
    }

    if (userId !== product.userId) {
      throw new ConflictException('You are not allowed to delete product');
    }

    await this.blogProductRepository.deleteById(id);
  }

  public async getProduct(
    id: string,
    userId: string | null | undefined
  ): Promise<ShopProductEntity> {
    const existProduct = await this.blogProductRepository.findById(id);
    if (!existProduct) {
      throw new NotFoundException(ShopProductResponse.ProductNotFound);
    }

    if (
      userId !== null &&
      userId !== existProduct.userId &&
      existProduct.state === ProductState.Draft
    ) {
      throw new NotFoundException(ShopProductResponse.ProductNotFound);
    }

    return existProduct;
  }

  public async getProducts(
    query?: ShopProductQuery
  ): Promise<PaginationResult<ShopProductEntity | null>> {
    return this.blogProductRepository.find(query);
  }
}
