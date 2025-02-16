import { fillDto } from '@backend/helpers';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponse } from './product.constant';
import { ProductQuery } from './product.query';
import { ProductService } from './product.service';
import { ProductWithPaginationRdo } from './rdo/product-with-pagination.rdo';
import { ProductRdo } from './rdo/product.rdo';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:id/:userId')
  @ApiResponse({
    type: ProductRdo,
    status: HttpStatus.OK,
    description: ProductResponse.ProductFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ProductResponse.ProductNotFound,
  })
  @ApiTags('shop product')
  public async show(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    return fillDto(ProductRdo, product.toPOJO());
  }

  @Get('/')
  @ApiResponse({
    type: ProductWithPaginationRdo,
    status: HttpStatus.OK,
    description: ProductResponse.ProductsFound,
  })
  @ApiTags('shop product')
  public async index(@Query() query: ProductQuery) {
    const productsWithPagination = await this.productService.getProducts(query);
    const result = {
      ...productsWithPagination,
      entities: productsWithPagination.entities.map((product) =>
        product.toPOJO()
      ),
    };
    return fillDto(ProductWithPaginationRdo, result);
  }

  @ApiResponse({
    type: ProductRdo,
    status: HttpStatus.CREATED,
    description: ProductResponse.ProductCreated,
  })
  @Post('/')
  @ApiTags('shop product')
  public async create(@Body() dto: CreateProductDto) {
    const newProduct = await this.productService.createProduct(dto);
    console.log(newProduct);

    return fillDto(ProductRdo, newProduct.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: ProductResponse.ProductDeleted,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ProductResponse.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ProductResponse.ProductNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ProductResponse.AccessDeny,
  })
  @Delete('/:id/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiTags('shop product')
  public async destroy(@Param('id') id: string) {
    await this.productService.deleteProduct(id);
  }

  @ApiResponse({
    type: ProductRdo,
    status: HttpStatus.OK,
    description: ProductResponse.ProductUpdated,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ProductResponse.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ProductResponse.ProductNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ProductResponse.AccessDeny,
  })
  @Put('/:id')
  @ApiTags('shop product')
  public async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const updatedProduct = await this.productService.updateProduct(id, dto);
    return fillDto(ProductRdo, updatedProduct.toPOJO());
  }
}
