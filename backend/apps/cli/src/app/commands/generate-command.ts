import {
  generateArticleNumber,
  generateRandomDate,
  generateRandomValue,
  getRandomItem,
} from '@backend/helpers';
import { CORDS_COUNT, Product } from '@backend/shared/core';
import { PrismaClient, ProductType } from '@prisma/client';
import * as crypto from 'crypto';

import {
  MOCK_END_DATE,
  MOCK_PRODUCTS,
  MOCK_START_DATE,
} from './command.constant';
import { Command } from './command.interface';

export class GenerateCommand implements Command {
  private getProduct(): Product {
    const product = getRandomItem(MOCK_PRODUCTS);
    const randomDate = generateRandomDate(MOCK_START_DATE, MOCK_END_DATE);
    const randomImageIndex = generateRandomValue(0, 8);
    return {
      id: crypto.randomUUID(),
      name: product.name,
      describe: product.description,
      createdAt: randomDate,
      photoPath: `catalog-product-${randomImageIndex}.png`,
      productType: getRandomItem(Object.values(ProductType)),
      article: generateArticleNumber(15),
      cordsCount: getRandomItem(Object.values(CORDS_COUNT)),
      price: product.price,
    };
  }

  private getProducts(length: number) {
    return Array.from({ length }, this.getProduct);
  }

  private async uploadToDatabase(
    products: Product[],
    connectionString: string
  ) {
    const prismaClient = new PrismaClient({ datasourceUrl: connectionString });
    try {
      for (const product of products) {
        await prismaClient.product.create({ data: product });
      }
      console.info(`🤘️ Database was filled with ${products.length} records`);
      globalThis.process.exit(0);
    } catch (error: unknown) {
      console.error(error);
      globalThis.process.exit(1);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, connectionString] = parameters;
    const productsCount = parseInt(count, 10);
    if (productsCount <= 0) {
      console.error('Количество тестовых товаров должно быть больше 0');
      globalThis.process.exit(1);
    }
    const mockProducts = this.getProducts(productsCount);
    try {
      await this.uploadToDatabase(mockProducts, connectionString);
    } catch (error: unknown) {
      console.error('Can not generate data');
      console.error(error);
    }
  }
}
