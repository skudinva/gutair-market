import {
  generateArticleNumber,
  generateRandomDate,
  getRandomItem,
} from '@backend/helpers';
import { CORDS_COUNT, Product } from '@backend/shared/core';
import { ShopUserEntity } from '@backend/shop-user';
import { PrismaClient, ProductType } from '@prisma/client';
import * as crypto from 'crypto';
import mongoose, { Schema } from 'mongoose';
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
    const randomProductType = getRandomItem(Object.values(ProductType));

    return {
      id: crypto.randomUUID(),
      name: product.name,
      describe: product.description,
      createdAt: randomDate,
      photoPath: `${randomProductType}.png`,
      productType: randomProductType,
      article: generateArticleNumber(15),
      cordsCount: getRandomItem(Object.values(CORDS_COUNT)),
      price: product.price,
    };
  }

  private getProducts(length: number) {
    return Array.from({ length }, this.getProduct);
  }

  private async uploadAccountToDatabase(connectionString: string) {
    await mongoose.connect(connectionString);
    const adminUserEntity = new ShopUserEntity({
      email: 'admin',
      name: 'admin',
      passwordHash: '',
    });
    await adminUserEntity.setPassword('admin');

    const userModel = mongoose.model(
      'accounts',
      new Schema({
        email: String,
        name: String,
        passwordHash: String,
      })
    );

    await userModel.create(adminUserEntity.toPOJO());

    console.info('🤘️ User database was added user admin');
  }

  private async uploadProductToDatabase(
    products: Product[],
    connectionString: string
  ) {
    const prismaClient = new PrismaClient({ datasourceUrl: connectionString });
    try {
      for (const product of products) {
        await prismaClient.product.create({ data: product });
      }
      console.info(
        `🤘️ Product database was filled with ${products.length} records`
      );
    } catch (error: unknown) {
      console.error(error);
    } finally {
      await prismaClient.$disconnect();
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, pgConnectionString, mongoConnectionString] = parameters;
    const productsCount = parseInt(count, 10);
    if (productsCount <= 0) {
      console.error('Количество тестовых товаров должно быть больше 0');
      globalThis.process.exit(1);
    }
    const mockProducts = this.getProducts(productsCount);
    try {
      await this.uploadProductToDatabase(mockProducts, pgConnectionString);
      await this.uploadAccountToDatabase(mongoConnectionString);
      globalThis.process.exit(0);
    } catch (error: unknown) {
      console.error(error);
      globalThis.process.exit(1);
    }
  }
}
