import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BlogsService {
  //  Создаем массив, где будут лежать наши блоги
  private blogs: Blog[] = []; 

  create(createBlogDto: CreateBlogDto) {
    // Создаем объект нового блога
    const newBlog: Blog = {
      id: uuid(), 
      title: createBlogDto.title,
      description: createBlogDto.description,
      createdAt: new Date(),
    }
    return 'This action adds a new blog';
  }

  findAll() {
    return `This action returns all blogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
