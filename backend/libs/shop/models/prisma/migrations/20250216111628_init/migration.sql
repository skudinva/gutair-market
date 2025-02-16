-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('Electro', 'Acoustic', 'Ukulele');

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "describe" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "photo_path" TEXT NOT NULL,
    "product_type" "ProductType" NOT NULL,
    "article" TEXT NOT NULL,
    "cords_count" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
