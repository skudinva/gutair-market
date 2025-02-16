import { PrismaClientModule } from '@backend/shop-models';
import { Module } from '@nestjs/common';
import { ShopProductController } from './shop-product.controller';
import { ShopProductFactory } from './shop-product.factory';
import { ShopProductRepository } from './shop-product.repository';
import { ShopProductService } from './shop-product.service';

@Module({
  imports: [PrismaClientModule],
  controllers: [ShopProductController],
  providers: [ShopProductService, ShopProductRepository, ShopProductFactory],
  exports: [ShopProductService],
})
export class ShopProductModule {}
