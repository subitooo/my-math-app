import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepo: Repository<BlogEntity>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    // Создаем объект нового блога
    const blogEntity = this.blogRepo.create({
      id: uuid(),
      title: createBlogDto.title,
      description: createBlogDto.description,
      createdAt: new Date(),
    });
    await this.blogRepo.save(blogEntity);
    return blogEntity;
  }

  async findAll() {
    return await this.blogRepo.find();
  }

  async findOne(id: string) {
    return await this.blogRepo.findOneBy({ id });
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogRepo.findOneBy({ id });
    if (!blog) {
      throw new NotFoundException('Блог не найден');
    }
    //  Обновляем поля
    Object.assign(blog, updateBlogDto);
    // Сохраняем сущность
    return await this.blogRepo.save(blog);
  }

  async remove(id: string) {
    const blog = await this.blogRepo.findOneBy({ id });
    if (!blog) {
      throw new NotFoundException('Блог не найден');
    }
    await this.blogRepo.delete(id);
    return;
  }
}
