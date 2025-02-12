import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SERVE_ROOT } from '@project/shared/core';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderFactory } from './file-uploader.factory';
import { FileUploaderRepository } from './file-uploader.repository';
import { FileUploaderService } from './file-uploader.service';
import { FileModel, FileSchema } from './file.model';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>(
          'application.uploadDirectory'
        );
        return [
          {
            rootPath,
            serveRoot: `/${SERVE_ROOT}`,
            serveStaticOptions: {
              fallthrough: true,
              etag: true,
            },
          },
        ];
      },
    }),
    MongooseModule.forFeature([{ name: FileModel.name, schema: FileSchema }]),
  ],
  providers: [FileUploaderService, FileUploaderRepository, FileUploaderFactory],
  controllers: [FileUploaderController],
})
export class FileUploaderModule {}
