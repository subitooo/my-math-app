import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './interfaces/blog.interface';
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
    this.blogs.push(newBlog);
    return newBlog;
  }

  findAll() {
    return this.blogs;
  }

  findOne(id: string) {
     return this.blogs.find(blog => blog.id === id );
  }

  findByBlogId(blogId: string) {
    return this.blogs.filter(blog => blog.id === blogId);
  }

  update(id: string, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: string) {
     this.blogs = this.blogs.filter(blog => blog.id !== id);
     return
  }
}
