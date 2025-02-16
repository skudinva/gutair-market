import { BaseProductgresRepository } from '@backend/data-access';
import { PaginationResult, Product } from '@backend/shared/core';
import { PrismaClientService } from '@backend/shop-models';
import { Injectable } from '@nestjs/common';
import { ProductState, Prisma } from '@prisma/client';
import { ShopProductEntity } from './shop-product.entity';
import { ShopProductFactory } from './shop-product.factory';
import { ShopProductQuery } from './shop-product.query';

@Injectable()
export class ShopProductRepository extends BaseProductgresRepository<
  ShopProductEntity,
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

  public override async save(product: ShopProductEntity): Promise<void> {
    const pojoProduct = product.toPOJO();
    const record = await this.client.product.create({
      data: {
        ...pojoProduct,
      },
    });

    product.id = record.id;
  }

  override async update(product: ShopProductEntity): Promise<void> {
    const pojoProduct = product.toPOJO();
    await this.client.product.update({
      where: { id: product.id },
      data: {
        productType: pojoProduct.productType,
        isReproduct: pojoProduct.isReproduct,
        originUserId: pojoProduct.originUserId ?? undefined,
        originProductId: pojoProduct.originProductId ?? undefined,
        state: pojoProduct.state,
        publicDate: pojoProduct.publicDate,
      },
    });
  }

  public override async deleteById(id: string): Promise<void> {
    await this.client.product.delete({
      where: {
        id,
      },
    });
  }

  public override async findById(
    id: ShopProductEntity['id']
  ): Promise<ShopProductEntity | null> {
    const product = await this.client.product.findUnique({
      where: { id },
    });

    return this.createEntityFromDocument(product);
  }

  public async find(
    query?: ShopProductQuery
  ): Promise<PaginationResult<ShopProductEntity | null>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.ProductWhereInput = {};
    const orderBy: Prisma.ProductOrderByWithRelationInput = {};
    const userId = query.userId ?? null;

    if (query?.productType) {
      where.productType = query.productType;
    }

    if (query?.productUserId) {
      where.userId = query.productUserId;
      if (userId !== query.productUserId) {
        where.state = ProductState.Published;
      }
    } else {
      where.state = ProductState.Published;
    }

    if (query?.sortBy) {
      orderBy[query.sortBy] = query.sortDirection;
    }

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

  public async findReproduct(
    originProductId: string,
    userId: string
  ): Promise<ShopProductEntity | null> {
    const product = await this.client.product.findFirst({
      where: {
        originProductId,
        userId,
      },
    });

    return this.createEntityFromDocument(product);
  }
}
