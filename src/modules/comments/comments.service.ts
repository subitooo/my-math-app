import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comments.dto";
import { Comment } from "./interface/comments.interface";
import { v4 as uuid } from 'uuid';
import { PostsService } from "../posts/posts.service";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "./entities/comments.entity";
import { Repository } from "typeorm";
import { PostEntity } from "../posts/entities/post.entity";

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentEntity)
        private commentRepo: Repository<CommentEntity>,

        @InjectRepository(PostEntity)
        private postRepo: Repository<PostEntity>,
    ) {}
    

    async create(createCommentDto: CreateCommentDto) {
        const postEntity = await this.postRepo.findOneBy({ id: createCommentDto.postId })
        if (!postEntity) {
            throw new NotFoundException('Не найдено такого поста');
        }

        const commentEntity = this.commentRepo.create({
            id: uuid(), // эту строку оставить?
            content: createCommentDto.content,
            post: postEntity,
            createdAt: new Date(),
        })

        await this.commentRepo.save(commentEntity);
        return commentEntity;

        // if (!this.postService.posts.find(post => post.id === dto.postId)) 
        //     throw new NotFoundException("Не найден пост");
        // const newComment: Comment = {
        //     id: uuid(),
        //     content: dto.content,
        //     createdAt: new Date(),
        //     postId: dto.postId
        // }
        // this.comments.push(newComment);
        // return newComment;
    }

    findByPostId(postId: string) {
        return this.commentRepo.find({
            where: {
                post: {
                    id: postId,
                }
            }
        })
    }


    async remove(id: string) {
        const commentEntity = await this.commentRepo.findOneBy({ id });

        if (!commentEntity) {
            throw new NotFoundException('Не найдено комментария');
        }
        
        await this.commentRepo.delete(id);
        return
    }
 }