import { BlogLikeModule } from '@backend/blog-like';
import { BlogNotifyModule } from '@backend/blog-notify';
import { BlogTagModule } from '@backend/blog-tag';
import { Module } from '@nestjs/common';
import { BlogPostController } from './blog-post.controller';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostService } from './blog-post.service';

@Module({
  imports: [BlogTagModule, BlogLikeModule, BlogNotifyModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository, BlogPostFactory],
  exports: [BlogPostService],
})
export class BlogPostModule {}
