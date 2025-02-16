import { PaginationResult } from '@backend/shared/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './product.entity';
import { ShopProductResponse } from './shop-product.constant';
import { ShopProductFactory } from './shop-product.factory';
import { ShopProductQuery } from './shop-product.query';
import { ShopProductRepository } from './shop-product.repository';

@Injectable()
export class ShopProductService {
  constructor(private readonly shopProductRepository: ShopProductRepository) {}

  public async createProduct(dto: CreateProductDto): Promise<ProductEntity> {
    const newProduct = ShopProductFactory.createFromCreateProductDto(dto);
    await this.shopProductRepository.save(newProduct);

    return newProduct;
  }

  public async updateProduct(
    id: string,
    dto: UpdateProductDto
  ): Promise<ProductEntity> {
    const existProduct = await this.getProduct(id);

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existProduct[key] !== value) {
        existProduct[key] = value;
      }
    }

    await this.shopProductRepository.update(existProduct);
    return existProduct;
  }

  public async deleteProduct(id: string): Promise<void> {
    const product = await this.getProduct(id);
    if (!product) {
      return;
    }

    await this.shopProductRepository.deleteById(id);
  }

  public async getProduct(id: string): Promise<ProductEntity> {
    const existProduct = await this.shopProductRepository.findById(id);
    if (!existProduct) {
      throw new NotFoundException(ShopProductResponse.ProductNotFound);
    }

    return existProduct;
  }

  public async getProducts(
    query?: ShopProductQuery
  ): Promise<PaginationResult<ProductEntity | null>> {
    return this.shopProductRepository.find(query);
  }
}
