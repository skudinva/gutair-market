import { createUrlForFile } from '@backend/helpers';
import { File } from '@backend/shared/core';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import FormData from 'form-data';
import 'multer';
import { ApplicationServiceURL } from './app.config';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  public async uploadFile(file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);
    const { data: fileMetaData } = await this.httpService.axiosRef.post<File>(
      `${ApplicationServiceURL.File}/api/files/upload`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    return createUrlForFile(fileMetaData, ApplicationServiceURL.File);
  }
}
