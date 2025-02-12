import { PrismaClientService } from '@backend/blog-models';
import { BasePostgresRepository } from '@backend/data-access';
import { Like } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { BlogLikeEntity } from './blog-like.entity';
import { BlogLikeFactory } from './blog-like.factory';

@Injectable()
export class BlogLikeRepository extends BasePostgresRepository<
  BlogLikeEntity,
  Like
> {
  constructor(likeFactory: BlogLikeFactory, client: PrismaClientService) {
    super(likeFactory, client);
  }
  public async isLikeExists({ userId, postId }: Like): Promise<boolean> {
    const like = await this.client.like.findFirst({
      where: {
        userId,
        postId,
      },
    });

    return like !== null;
  }

  public override async save(entity: BlogLikeEntity): Promise<void> {
    await this.client.like.create({
      data: {
        ...entity.toPOJO(),
      },
    });
  }

  public async deleteByIds({ userId, postId }: Like): Promise<void> {
    await this.client.like.delete({
      where: {
        userId_postId: {
          postId,
          userId,
        },
      },
    });
  }
}
