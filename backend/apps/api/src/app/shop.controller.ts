import {
  RequestWithTokenPayload,
  RequestWithTokenPayloadUrl,
} from '@backend/authentication';

import { InjectUserIdInterceptor } from '@backend/interceptors';
import {
  CORDS_COUNT,
  FieldValidate,
  SortDirection,
  SortType,
} from '@backend/shared/core';
import {
  CreateProductDto,
  CreateProductFileDto,
  ProductRdo,
  ProductResponse,
  ProductWithPaginationRdo,
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
    type: ProductRdo,
    status: HttpStatus.CREATED,
    description: ProductResponse.ProductFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ProductResponse.ProductNotFound,
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
      productDto.photoPath = await this.appService.uploadFile(file);
    }

    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Shop}/`,
      productDto
    );

    return data;
  }

  @Put('/:id')
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
      productDto.photoPath = await this.appService.uploadFile(file);
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
    type: ProductWithPaginationRdo,
    status: HttpStatus.OK,
    description: ProductResponse.ProductsFound,
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
    name: 'productType',
    required: false,
    enum: ProductType,
    description: 'Product type',
    isArray: true,
  })
  @ApiQuery({
    name: 'cordsCount',
    required: false,
    enum: Object.values(CORDS_COUNT),
    isArray: true,
    description: 'Cords counts',
  })
  @Get('/')
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  @ApiTags(ApiSection.Product)
  public async getProducts(@Req() req: RequestWithTokenPayloadUrl) {
    const userId = req.user?.sub;
    const requestUrl = userId ? `${req.url}&userId=${userId}` : req.url;
    const query = url.parse(requestUrl).query;

    const { data } =
      await this.httpService.axiosRef.get<ProductWithPaginationRdo>(
        `${ApplicationServiceURL.Shop}?${query}`
      );
    return data;
  }

  @ApiResponse({
    type: ProductRdo,
    status: HttpStatus.OK,
    description: ProductResponse.ProductFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ProductResponse.ProductNotFound,
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  @Get('/:id')
  @ApiTags(ApiSection.Product)
  public async getProduct(
    @Param('id') id: string,
    @Req() req: RequestWithTokenPayload
  ) {
    const userId = req.user?.sub;
    const { data } = await this.httpService.axiosRef.get<ProductRdo>(
      `${ApplicationServiceURL.Shop}/${id}/${userId}`
    );

    return data;
  }
}
