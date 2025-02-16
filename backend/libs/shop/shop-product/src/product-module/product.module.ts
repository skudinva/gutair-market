import { PrismaClientModule } from '@backend/shop-models';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductFactory } from './product.factory';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [PrismaClientModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, ProductFactory],
  exports: [ProductService],
})
export class ProductModule {}
