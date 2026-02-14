import { Module } from '@nestjs/common';
import { BlogModule } from './modules/blog/blog.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [BlogModule, PostsModule]
})
export class AppModule {}
