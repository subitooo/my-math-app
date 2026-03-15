import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { BlogEntity } from '../blog/entities/blog.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepo: Repository<PostEntity>,

    @InjectRepository(BlogEntity)
    private blogRepo: Repository<BlogEntity>,
  ) {}

  //  Создаем массив, где будут лежать наши посты
  // public posts: Post[] = [];  // временное хранилище постов

  async create(createPostDto: CreatePostDto) {
    const blogEntity = await this.blogRepo.findOneBy({
      id: createPostDto.blogId,
    });
    if (!blogEntity) {
      throw new NotFoundException('Не найдено блога');
    }

    const postEntity = this.postRepo.create({
      id: uuid(),
      title: createPostDto.title,
      content: createPostDto.content,
      blog: blogEntity,
      createdAt: new Date(),
    });
    await this.postRepo.save(postEntity);
    return postEntity;
  }

  // if (!this.postRepo.find(blog => blog.id === createPostDto.blogId))
  //   throw new NotFoundException("Блога не существует");

  // const newPost: Post = {
  //   id: uuid(),
  //   title: createPostDto.title,
  //   content: createPostDto.content,
  //   blogId: createPostDto.blogId,
  //   createdAt: new Date(),
  // }
  // this.posts.push(newPost);
  // return newPost;

  async findAll() {
    return await this.postRepo.find();
  }

  async findOne(id: string) {
    const postEntity = await this.postRepo.findOneBy({ id });

    if (!postEntity) {
      throw new NotFoundException('Не найдено поста');
    }
    return postEntity;
  }

  async findByBlogId(blogId: string) {
    const blogEntity = await this.blogRepo.findOneBy({ id: blogId });

    if (!blogEntity) {
      throw new NotFoundException('Не найдено блога');
    }

    return this.postRepo.find({
      where: {
        blog: {
          id: blogId,
        },
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const postEntity = await this.postRepo.findOneBy({ id });

    if (!postEntity) {
      throw new NotFoundException('Не найдено такого поста');
    }

    // Обновляем поля
    if (updatePostDto.title !== undefined) {
      postEntity.title = updatePostDto.title;
    }

    if (updatePostDto.content !== undefined) {
      postEntity.content = updatePostDto.content;
    }

    return this.postRepo.save(postEntity);
  }

  async remove(id: string) {
    const postEntity = await this.postRepo.findOneBy({ id });

    if (!postEntity) {
      throw new NotFoundException('Не найдено поста');
    }

    await this.postRepo.delete(id);
    return;
  }
}
