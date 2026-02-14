import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './modules/blog/blog.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [BlogModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
