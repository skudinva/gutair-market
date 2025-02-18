import {
  generateArticleNumber,
  generateRandomDate,
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
    const [year, month] = randomDate.toISOString().split('-');
    return {
      id: crypto.randomUUID(),
      name: product.name,
      describe: product.description,
      createdAt: randomDate,
      photoPath: `/${year}/${month}/${crypto.randomUUID()}.jpeg`,
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
      console.info('🤘️ Database was filled');
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
    const mockProducts = this.getProducts(Number.parseInt(count, 10));
    try {
      await this.uploadToDatabase(mockProducts, connectionString);
    } catch (error: unknown) {
      console.error('Can not generate data');
      console.error(error);
    }
  }
}
