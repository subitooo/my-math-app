import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './interface/post.interface';
import { v4 as uuid } from 'uuid';


@Injectable()
export class PostsService {
  //  Создаем массив, где будут лежать наши посты
    private posts: Post[] = [];  // временное хранилище постов

  create(createPostDto: CreatePostDto) {
    const newPost: Post = {
      id: uuid(),
      title: createPostDto.title,
      content: createPostDto.content,
      blogId: createPostDto.blogId,
      createdAt: new Date(),
    }
    this.posts.push(newPost);
    return newPost;
  }

  findAll() {
    return this.posts;
  }


  findOne(id: string) {
    return this.posts.find(posts => posts.id === id);
  }
  

  findByBlogId(blogId: string) {
    return this.posts.filter(post => post.blogId === blogId);
  }


  update(id: string, updatePostDto: UpdatePostDto) {
    const post = this.posts.find(post => post.id === id);
    if (!post) return '404';
    Object.assign(post, updatePostDto);
    return post;
  }

  remove(id: string) {
    this.posts = this.posts.filter(posts => posts.id !== id);
    return
  }
}
