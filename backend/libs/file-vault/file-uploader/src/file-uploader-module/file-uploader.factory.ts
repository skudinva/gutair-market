import { EntityFactory, File } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { FileUploaderEntity } from './file-uploader.entity';

@Injectable()
export class FileUploaderFactory implements EntityFactory<FileUploaderEntity> {
  public create(entityPlainData: File): FileUploaderEntity {
    return new FileUploaderEntity(entityPlainData);
  }
}
