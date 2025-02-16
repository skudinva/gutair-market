import { createUrlForFile } from '@backend/helpers';
import { File } from '@backend/shared/core';
import { ShopProductRdo } from '@backend/shop-product';
import { UserInfoRdo } from '@backend/shop-user';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import FormData from 'form-data';
import 'multer';
import { ApplicationServiceURL } from './app.config';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  public async appendUserInfo(products: ShopProductRdo[]): Promise<void> {
    const uniqueUserIds = new Set<string>();
    const usersInfo = new Map<string, UserInfoRdo>();

    products.forEach((product) => {
      uniqueUserIds.add(product.userId);
    });

    for (const userId of uniqueUserIds) {
      const { data } = await this.httpService.axiosRef.get<UserInfoRdo>(
        `${ApplicationServiceURL.Users}/${userId}`
      );

      usersInfo.set(data.id, data);
    }

    products.forEach((product) => {
      product['userInfo'] = usersInfo.get(product.userId);
    });
  }

  public async uploadFile(file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    const { data: fileMetaData } =
      await this.httpService.axiosRef.product<File>(
        `${ApplicationServiceURL.File}/api/files/upload`,
        formData,
        {
          headers: formData.getHeaders(),
        }
      );
    return createUrlForFile(fileMetaData, ApplicationServiceURL.File);
  }
}
