import { fillDto } from '@backend/helpers';
import { SortDirection, SortType } from '@backend/shared/core';
import { BlogNotifyService } from '@backend/shop-notify';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Product,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserIdDto } from './dto/user-id.dto';
import { ShopProductWithPaginationRdo } from './rdo/shop-product-with-pagination.rdo';
import { ShopProductRdo } from './rdo/shop-product.rdo';
import { ShopProductResponse } from './shop-product.constant';
import { ShopProductQuery } from './shop-product.query';
import { ShopProductService } from './shop-product.service';

@Controller('products')
export class ShopProductController {
  constructor(
    private readonly blogProductService: ShopProductService,
    private readonly notifyService: BlogNotifyService
  ) {}

  @Get('/:id/:userId')
  @ApiResponse({
    type: ShopProductRdo,
    status: HttpStatus.OK,
    description: ShopProductResponse.ProductFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ShopProductResponse.ProductNotFound,
  })
  @ApiTags('shop product')
  public async show(@Param('id') id: string, @Param('userId') userId: string) {
    const product = await this.blogProductService.getProduct(id, userId);
    return fillDto(ShopProductRdo, product.toPOJO());
  }

  @Get('/')
  @ApiResponse({
    type: ShopProductWithPaginationRdo,
    status: HttpStatus.OK,
    description: ShopProductResponse.ProductsFound,
  })
  @ApiTags('shop product')
  public async index(@Query() query: ShopProductQuery) {
    const productsWithPagination = await this.blogProductService.getProducts(
      query
    );
    const result = {
      ...productsWithPagination,
      entities: productsWithPagination.entities.map((product) =>
        product.toPOJO()
      ),
    };
    return fillDto(ShopProductWithPaginationRdo, result);
  }

  @ApiResponse({
    type: ShopProductRdo,
    status: HttpStatus.CREATED,
    description: ShopProductResponse.ProductCreated,
  })
  @Post('/')
  @ApiTags('shop product')
  public async create(@Body() dto: CreateProductDto) {
    const newProduct = await this.blogProductService.createProduct(dto);
    return fillDto(ShopProductRdo, newProduct.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: ShopProductResponse.ProductDeleted,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ShopProductResponse.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ShopProductResponse.ProductNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ShopProductResponse.AccessDeny,
  })
  @Delete('/:productId/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiTags('shop product')
  public async destroy(
    @Param('productId') productId: string,
    @Param('userId') userId: string
  ) {
    await this.blogProductService.deleteProduct(productId, userId);
  }

  @ApiResponse({
    type: ShopProductRdo,
    status: HttpStatus.OK,
    description: ShopProductResponse.ProductUpdated,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ShopProductResponse.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ShopProductResponse.ProductNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ShopProductResponse.AccessDeny,
  })
  @Patch('/:id')
  @ApiTags('shop product')
  public async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const updatedProduct = await this.blogProductService.updateProduct(id, dto);
    return fillDto(ShopProductRdo, updatedProduct.toPOJO());
  }

  @Post('sendNewProductNotify')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiTags('shop product')
  public async sendNewProductNotify(@Body() dto: UserIdDto) {
    const query = new ShopProductQuery();
    query.userId = dto.userId;
    query.sortBy = SortType.DATE;
    query.sortDirection = SortDirection.Desc;
    const { entities } = await this.blogProductService.getProducts(query);

    this.notifyService.sendNewProductNotify(
      entities.map((product) => product.toPOJO()),
      dto.userId
    );
  }
}
