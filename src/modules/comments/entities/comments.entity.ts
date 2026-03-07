import { PostEntity } from "src/modules/posts/entities/post.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class CommentEntity  {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    content: string;

    @ManyToOne(() => PostEntity)
    post: PostEntity;

    @Column({type: 'timestamp without time zone'})
    createdAt: Date;
}