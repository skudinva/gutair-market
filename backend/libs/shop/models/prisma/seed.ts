import { PrismaClient, Product } from '@prisma/client';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CORDS_COUNT, ProductType } from '../../../shared/core/src';

function generateArticleNumber(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  return Array.from({ length }, () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
  }).join('');
}

function generateRandomDate(start: Date, end: Date) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime =
    Math.floor(Math.random() * (endTime - startTime + 1)) + startTime;

  return new Date(randomTime);
}

function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

const MOCK_PRODUCTS = [
  {
    name: 'ThunderStrummer',
    description:
      'A powerful electric guitar known for its deep, resonant tone and aggressive look.',
    price: 505,
  },
  {
    name: 'SonicViper',
    description:
      'A sleek and modern guitar with a sharp, cutting sound perfect for lead solos.',
    price: 999,
  },
  {
    name: 'EclipseRider',
    description:
      'A semi-hollow body guitar that offers a smooth, warm tone with excellent sustain.',
    price: 2000,
  },
  {
    name: 'StarStrider',
    description:
      'An acoustic guitar with a bright and balanced sound, ideal for folk and singer-songwriter styles.',
    price: 1500,
  },
  {
    name: 'MysticWhisper',
    description:
      'A unique 12-string acoustic guitar that produces an ethereal, rich sound with a haunting quality.',
    price: 4500,
  },
  {
    name: 'ShadowFury',
    description:
      'A heavy-duty electric guitar designed for high-gain, aggressive playing with a thick, powerful tone.',
    price: 2300,
  },
  {
    name: 'CosmicRage',
    description:
      'An avant-garde electric guitar with an otherworldly appearance and a wide range of tonal possibilities.',
    price: 333,
  },
  {
    name: 'IronTide',
    description:
      'A workhorse electric guitar favored by blues and rock players for its versatile, punchy tone.',
    price: 899,
  },
  {
    name: 'PhoenixFire',
    description:
      'A limited edition electric guitar known for its fiery looks and searing, high-gain sound.',
    price: 5000,
  },
  {
    name: 'FrostBite',
    description:
      'An acoustic-electric guitar with a crisp, clear tone and excellent projection for live performances.',
    price: 200,
  },
];

const MOCK_START_DATE = new Date(2024, 0, 1);
const MOCK_END_DATE = new Date(2025, 0, 1);

function getProduct(): Product {
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

function getProducts(length: number) {
  return Array.from({ length }, getProduct);
}

async function seedDb(prismaClient: PrismaClient) {
  const mockProducts = getProducts(20);

  for (const post of mockProducts) {
    await prismaClient.product.create({ data: post });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
