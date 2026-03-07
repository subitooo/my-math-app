import { BlogEntity } from "src/modules/blog/entities/blog.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => BlogEntity)
    blog: BlogEntity;

    @Column({type: "timestamp without time zone"})
    createdAt: Date;
}