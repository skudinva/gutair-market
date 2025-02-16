import { BlogConfigModule } from '@backend/shop-config';
import { ShopProductModule } from '@backend/shop-product';
import { Module } from '@nestjs/common';

@Module({
  imports: [ShopProductModule, BlogConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
