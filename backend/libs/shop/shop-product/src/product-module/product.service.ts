import { PaginationResult } from '@backend/shared/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponse } from './product.constant';
import { ProductEntity } from './product.entity';
import { ProductFactory } from './product.factory';
import { ProductQuery } from './product.query';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async createProduct(dto: CreateProductDto): Promise<ProductEntity> {
    const newProduct = ProductFactory.createFromCreateProductDto(dto);
    await this.productRepository.save(newProduct);

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

    await this.productRepository.update(existProduct);
    return existProduct;
  }

  public async deleteProduct(id: string): Promise<void> {
    const product = await this.getProduct(id);
    if (!product) {
      return;
    }

    await this.productRepository.deleteById(id);
  }

  public async getProduct(id: string): Promise<ProductEntity> {
    const existProduct = await this.productRepository.findById(id);
    if (!existProduct) {
      throw new NotFoundException(ProductResponse.ProductNotFound);
    }

    return existProduct;
  }

  public async getProducts(
    query?: ProductQuery
  ): Promise<PaginationResult<ProductEntity | null>> {
    return this.productRepository.find(query);
  }
}
