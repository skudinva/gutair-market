import { Comment, EntityFactory } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class BlogCommentFactory implements EntityFactory<BlogCommentEntity> {
  public create(entityPlainData: Comment): BlogCommentEntity {
    return new BlogCommentEntity(entityPlainData);
  }

  public createFromDto(
    dto: CreateCommentDto,
    postId: string
  ): BlogCommentEntity {
    const currentDate = new Date();
    return new BlogCommentEntity({
      ...dto,
      postId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }
}
