import { BlogConfigModule } from '@backend/blog-config';
import { BlogPostModule } from '@backend/blog-post';
import { Module } from '@nestjs/common';

@Module({
  imports: [BlogPostModule, BlogConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
