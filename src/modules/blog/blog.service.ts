import { Injectable } from '@nestjs/common';
import { Blog } from './interfaces/blog.interface';
import { CreateBlogDto } from './dto/create-blog.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BlogService {
  private blogs: Blog[] = [];

  create(createBlogDto: CreateBlogDto): Blog {
    const newBlog: Blog = {
      id: uuidv4(),
      title: createBlogDto.title,
      description: createBlogDto.description,
      createdAt: new Date(),
    };

    this.blogs.push(newBlog);

    return newBlog;
  }

  findAll(): Blog[] {
  return this.blogs;
}

}
