import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

import { PostEntity } from '../posts/entities/post.entity';
import { CommentEntity } from './entities/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, PostEntity])],
  exports: [],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
