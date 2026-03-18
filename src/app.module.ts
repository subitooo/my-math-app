import { Module } from '@nestjs/common';
import { BlogModule } from './modules/blog/blog.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './modules/blog/entities/blog.entity';
import { PostEntity } from './modules/posts/entities/post.entity';

@Module({
  imports: [
    BlogModule,
    PostsModule,
    CommentsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'blog',
      entities: [BlogEntity, PostEntity],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
