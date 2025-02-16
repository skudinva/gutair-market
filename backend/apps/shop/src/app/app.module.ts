import { ShopConfigModule } from '@backend/shop-config';
import { ProductModule } from '@backend/shop-product';
import { Module } from '@nestjs/common';

@Module({
  imports: [ProductModule, ShopConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
