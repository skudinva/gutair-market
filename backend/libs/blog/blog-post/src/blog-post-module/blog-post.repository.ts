import { PrismaClientService } from '@backend/blog-models';
import { BasePostgresRepository } from '@backend/data-access';
import { PaginationResult, Post } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { PostState, Prisma } from '@prisma/client';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostQuery } from './blog-post.query';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<
  BlogPostEntity,
  Post
> {
  constructor(entityFactory: BlogPostFactory, client: PrismaClientService) {
    super(entityFactory, client);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    if (limit === 0) {
      return 0;
    }
    return Math.ceil(totalCount / limit);
  }

  public override async save(post: BlogPostEntity): Promise<void> {
    const pojoPost = post.toPOJO();
    const record = await this.client.post.create({
      data: {
        ...pojoPost,
      },
    });

    post.id = record.id;
  }

  override async update(post: BlogPostEntity): Promise<void> {
    const pojoPost = post.toPOJO();
    await this.client.post.update({
      where: { id: post.id },
      data: {
        postType: pojoPost.postType,
        isRepost: pojoPost.isRepost,
        originUserId: pojoPost.originUserId ?? undefined,
        originPostId: pojoPost.originPostId ?? undefined,
        state: pojoPost.state,
        publicDate: pojoPost.publicDate,
      },
    });
  }

  public override async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  public override async findById(
    id: BlogPostEntity['id']
  ): Promise<BlogPostEntity | null> {
    const post = await this.client.post.findUnique({
      where: { id },
    });

    return this.createEntityFromDocument(post);
  }

  public async find(
    query?: BlogPostQuery
  ): Promise<PaginationResult<BlogPostEntity | null>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};
    const userId = query.userId ?? null;

    if (query?.postType) {
      where.postType = query.postType;
    }

    if (query?.postUserId) {
      where.userId = query.postUserId;
      if (userId !== query.postUserId) {
        where.state = PostState.Published;
      }
    } else {
      where.state = PostState.Published;
    }

    if (query?.sortBy) {
      orderBy[query.sortBy] = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }

  public async findRepost(
    originPostId: string,
    userId: string
  ): Promise<BlogPostEntity | null> {
    const post = await this.client.post.findFirst({
      where: {
        originPostId,
        userId,
      },
    });

    return this.createEntityFromDocument(post);
  }
}
