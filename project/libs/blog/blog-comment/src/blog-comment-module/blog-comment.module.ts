import { PrismaClientModule } from '@backend/blog-models';
import { BlogPostModule } from '@backend/blog-post';
import { Module } from '@nestjs/common';
import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentFactory } from './blog-comment.factory';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentService } from './blog-comment.service';

@Module({
  imports: [PrismaClientModule, BlogPostModule],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentRepository, BlogCommentFactory],
  exports: [BlogCommentRepository, BlogCommentFactory],
})
export class BlogCommentModule {}
