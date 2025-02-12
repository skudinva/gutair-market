import { PaginationResult } from '@backend/shared/core';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostState } from '@prisma/client';
import { BlogPostResponse } from './blog-post.constant';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostQuery } from './blog-post.query';
import { BlogPostRepository } from './blog-post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class BlogPostService {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const newPost = BlogPostFactory.createFromCreatePostDto(dto);
    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async updatePost(
    id: string,
    dto: UpdatePostDto
  ): Promise<BlogPostEntity> {
    const existPost = await this.getPost(id, dto.userId);

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existPost[key] !== value) {
        existPost[key] = value;
      }
    }

    await this.blogPostRepository.update(existPost);
    return existPost;
  }

  public async deletePost(id: string, userId: string): Promise<void> {
    const post = await this.getPost(id, null);
    if (!post) {
      return;
    }

    if (userId !== post.userId) {
      throw new ConflictException('You are not allowed to delete post');
    }

    await this.blogPostRepository.deleteById(id);
  }

  public async getPost(
    id: string,
    userId: string | null | undefined
  ): Promise<BlogPostEntity> {
    const existPost = await this.blogPostRepository.findById(id);
    if (!existPost) {
      throw new NotFoundException(BlogPostResponse.PostNotFound);
    }

    if (
      userId !== null &&
      userId !== existPost.userId &&
      existPost.state === PostState.Draft
    ) {
      throw new NotFoundException(BlogPostResponse.PostNotFound);
    }

    return existPost;
  }

  public async getPosts(
    query?: BlogPostQuery
  ): Promise<PaginationResult<BlogPostEntity | null>> {
    return this.blogPostRepository.find(query);
  }
}
