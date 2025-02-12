import { EntityFactory, Tag } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { BlogTagEntity } from './blog-tag.entity';

@Injectable()
export class BlogTagFactory implements EntityFactory<BlogTagEntity> {
  create(entityPlainData: Tag): BlogTagEntity {
    return new BlogTagEntity(entityPlainData);
  }
}
