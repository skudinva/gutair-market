import {
  RequestWithTokenPayload,
  RequestWithTokenPayloadUrl,
} from '@backend/authentication';

import { InjectUserIdInterceptor } from '@backend/interceptors';
import { FieldValidate, SortDirection, SortType } from '@backend/shared/core';
import {
  CreateProductDto,
  CreateProductFileDto,
  ShopProductRdo,
  ShopProductResponse,
  ShopProductWithPaginationRdo,
  UpdateProductDto,
  UpdateProductFileDto,
} from '@backend/shop-product';
import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductType } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import 'multer';
import * as url from 'node:url';
import { ApiSection, ApplicationServiceURL } from './app.config';
import { AppService } from './app.service';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthForceGuard } from './guards/check-auth-force.guard';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('shop')
@UseFilters(AxiosExceptionFilter)
export class ShopController {
  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService
  ) {}

  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    type: ShopProductRdo,
    status: HttpStatus.CREATED,
    description: ShopProductResponse.ProductFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ShopProductResponse.ProductNotFound,
  })
  @Post('/')
  @ApiTags(ApiSection.Product)
  public async createProduct(
    @Body() dto: CreateProductFileDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: FieldValidate.MaxFileSizeForProduct,
          }),
          new FileTypeValidator({
            fileType: FieldValidate.AllowedImageFileType,
          }),
        ],
        fileIsRequired: false,
      })
    )
    file?: Express.Multer.File
  ) {
    const productDto = plainToInstance(
      CreateProductDto,
      JSON.parse(String(dto.product))
    );

    if (file) {
      //productDto.extraProperty.photo = await this.appService.uploadFile(file);
    }

    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Shop}/`,
      productDto
    );

    return data;
  }

  @Put('/:id')
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
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiTags(ApiSection.Product)
  public async updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductFileDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: FieldValidate.MaxFileSizeForProduct,
          }),
          new FileTypeValidator({
            fileType: FieldValidate.AllowedImageFileType,
          }),
        ],
        fileIsRequired: false,
      })
    )
    file?: Express.Multer.File
  ) {
    const productDto = plainToInstance(
      UpdateProductDto,
      JSON.parse(String(dto.product))
    );

    if (file) {
      // productDto.extraProperty.photo = await this.appService.uploadFile(file);
    }

    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Shop}/${id}`,
      productDto
    );

    return data;
  }

  @Delete('/:id')
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @ApiTags(ApiSection.Product)
  public async deleteProduct(
    @Param('id') id: string,
    @Req() req: RequestWithTokenPayload
  ) {
    const userId = req.user.sub;
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Shop}/${id}/${userId}`
    );

    return data;
  }

  @ApiResponse({
    type: ShopProductWithPaginationRdo,
    status: HttpStatus.OK,
    description: ShopProductResponse.ProductsFound,
  })
  @ApiQuery({
    name: 'tags',
    required: false,
    type: [String],
    description: 'Tags',
  })
  @ApiQuery({
    name: 'sortDirection',
    required: true,
    enum: SortDirection,
    description: 'Sort direction',
  })
  @ApiQuery({
    name: 'sortBy',
    required: true,
    enum: SortType,
    description: 'Sort by',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    example: 1,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term',
  })
  @ApiQuery({
    name: 'productUserId',
    required: false,
    type: String,
    example: '677cd8d75ff92067f1de5911',
    description: 'Author id of the product',
  })
  @ApiQuery({
    name: 'productType',
    required: false,
    enum: ProductType,
    description: 'Product type',
  })
  @Get('/')
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthForceGuard)
  @ApiTags(ApiSection.Product)
  public async getProducts(@Req() req: RequestWithTokenPayloadUrl) {
    const userId = req.user?.sub;
    const requestUrl = userId ? `${req.url}&userId=${userId}` : req.url;
    const query = url.parse(requestUrl).query;

    const { data } =
      await this.httpService.axiosRef.get<ShopProductWithPaginationRdo>(
        `${ApplicationServiceURL.Shop}?${query}`
      );
    await this.appService.appendUserInfo(data.entities);
    return data;
  }

  @ApiResponse({
    type: ShopProductRdo,
    status: HttpStatus.OK,
    description: ShopProductResponse.ProductFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ShopProductResponse.ProductNotFound,
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthForceGuard)
  @Get('/:id')
  @ApiTags(ApiSection.Product)
  public async getProduct(
    @Param('id') id: string,
    @Req() req: RequestWithTokenPayload
  ) {
    const userId = req.user?.sub;
    const { data } = await this.httpService.axiosRef.get<ShopProductRdo>(
      `${ApplicationServiceURL.Shop}/${id}/${userId}`
    );
    await this.appService.appendUserInfo([data]);

    return data;
  }
}
