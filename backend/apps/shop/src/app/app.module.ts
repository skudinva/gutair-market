import { ShopConfigModule } from '@backend/shop-config';
import { ShopProductModule } from '@backend/shop-product';
import { Module } from '@nestjs/common';

@Module({
  imports: [ShopProductModule, ShopConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
