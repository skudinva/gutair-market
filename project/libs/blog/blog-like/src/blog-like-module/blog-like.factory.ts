import { EntityFactory, Like } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { BlogLikeEntity } from './blog-like.entity';

@Injectable()
export class BlogLikeFactory implements EntityFactory<BlogLikeEntity> {
  create(entityPlainData: Like): BlogLikeEntity {
    return new BlogLikeEntity(entityPlainData);
  }
}
