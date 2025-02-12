import { EntityFactory, Post } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { PostState } from '@prisma/client';
import dayjs from 'dayjs';
import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreatePostDto): BlogPostEntity {
    const newPost = new BlogPostEntity();
    newPost.id = undefined;
    newPost.postType = dto.postType;
    newPost.userId = dto.userId;
    newPost.isRepost = false;
    newPost.state = PostState.Published;
    newPost.createdAt = dayjs().toDate();
    newPost.publicDate = dayjs().toDate();
    newPost.originUserId = null;
    newPost.originPostId = null;

    return newPost;
  }
}
