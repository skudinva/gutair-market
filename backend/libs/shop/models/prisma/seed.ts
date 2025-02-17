import { PrismaClient, Product, ProductType } from '@prisma/client';
import { CORDS_COUNT } from '../../../shared/core/src';
import {
  generateArticleNumber,
  generateRandomDate,
  getRandomItem,
} from '../../../shared/helpers/src';

const guitars = [
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

const startDate = new Date(2024, 0, 1);
const endDate = new Date(2025, 0, 1);

function getProduct(): Product {
  const guitar = getRandomItem(guitars);

  return {
    id: crypto.randomUUID(),
    name: guitar.name,
    describe: guitar.description,
    createdAt: generateRandomDate(startDate, endDate),
    photoPath: '/2025/02/15346829-ffd0-40d0-8d3e-de7be6ecac3a.jpeg',
    productType: getRandomItem(Object.values(ProductType)),
    article: generateArticleNumber(15),
    cordsCount: getRandomItem(Object.values(CORDS_COUNT)),
    price: guitar.price,
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
