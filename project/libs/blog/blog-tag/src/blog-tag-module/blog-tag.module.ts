import { PrismaClientModule } from '@backend/blog-models';
import { Module } from '@nestjs/common';
import { BlogTagFactory } from './blog-tag.factory';
import { BlogTagRepository } from './blog-tag.repository';
import { BlogTagService } from './blog-tag.service';

@Module({
  imports: [PrismaClientModule],
  providers: [BlogTagRepository, BlogTagFactory, BlogTagService],
  exports: [BlogTagService],
})
export class BlogTagModule {}
