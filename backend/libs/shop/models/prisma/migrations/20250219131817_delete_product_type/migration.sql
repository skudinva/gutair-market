/*
  Warnings:

  - Changed the type of `product_type` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "product_type",
ADD COLUMN     "product_type" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ProductType";
