import { BasePostgresRepository } from '@backend/data-access';
import { PaginationResult, Product } from '@backend/shared/core';
import { PrismaClientService } from '@backend/shop-models';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProductEntity } from './product.entity';
import { ShopProductFactory } from './shop-product.factory';
import { ShopProductQuery } from './shop-product.query';

@Injectable()
export class ShopProductRepository extends BasePostgresRepository<
  ProductEntity,
  Product
> {
  constructor(entityFactory: ShopProductFactory, client: PrismaClientService) {
    super(entityFactory, client);
  }

  private async getProductCount(
    where: Prisma.ProductWhereInput
  ): Promise<number> {
    return this.client.product.count({ where });
  }

  private calculateProductsPage(totalCount: number, limit: number): number {
    if (limit === 0) {
      return 0;
    }
    return Math.ceil(totalCount / limit);
  }

  private async composeWhere(
    query?: ShopProductQuery
  ): Promise<Prisma.ProductWhereInput> {
    const { productType, cordsCount } = query;
    const where: Prisma.ProductWhereInput = {};

    if (productType) {
      where.productType = productType;
    }

    if (cordsCount) {
      where.cordsCount = cordsCount;
    }

    return where;
  }

  private async composeOrderBy(
    query?: ShopProductQuery
  ): Promise<Prisma.ProductOrderByWithRelationInput> {
    const { sortBy, sortDirection } = query;
    const orderBy: Prisma.ProductOrderByWithRelationInput = {};

    if (sortBy) {
      orderBy[sortBy] = sortDirection;
    }

    return orderBy;
  }

  public override async save(product: ProductEntity): Promise<void> {
    const pojoProduct = product.toPOJO();
    const record = await this.client.product.create({
      data: {
        ...pojoProduct,
      },
    });

    product.id = record.id;
  }

  override async update(product: ProductEntity): Promise<void> {
    const pojoProduct = product.toPOJO();
    await this.client.product.update({
      where: { id: product.id },
      data: {
        ...pojoProduct,
      },
    });
  }

  public override async deleteById(id: string): Promise<void> {
    await this.client.product.delete({ where: { id } });
  }

  public override async findById(
    id: ProductEntity['id']
  ): Promise<ProductEntity | null> {
    const product = await this.client.product.findUnique({ where: { id } });
    return this.createEntityFromDocument(product);
  }

  public async find(
    query?: ShopProductQuery
  ): Promise<PaginationResult<ProductEntity | null>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where = await this.composeWhere(query);
    const orderBy = await this.composeOrderBy(query);

    const [records, productCount] = await Promise.all([
      this.client.product.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.getProductCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculateProductsPage(productCount, take),
      itemsPerPage: take,
      totalItems: productCount,
    };
  }
}
