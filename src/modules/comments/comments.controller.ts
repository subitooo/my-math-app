import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  create(@Body() data: CreateCommentDto) {
    return this.commentsService.create(data);
  }

  @Get(':postId')
  findByPostId(@Param('postId') postId: string) {
    return this.commentsService.findByPostId(postId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
