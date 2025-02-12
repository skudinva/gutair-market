import { BlogCommentModule } from '@backend/blog-comment';
import { BlogConfigModule } from '@backend/blog-config';
import { BlogLikeModule } from '@backend/blog-like';
import { BlogPostModule } from '@backend/blog-post';
import { BlogTagModule } from '@backend/blog-tag';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BlogPostModule,
    BlogTagModule,
    BlogCommentModule,
    BlogLikeModule,
    BlogConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
