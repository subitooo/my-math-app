import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
//import { Blog } from "../interfaces/blog.interface";

@Entity()
export class BlogEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({nullable: true})
    description: string;

    @Column({type: "timestamp without time zone"})
    createdAt: Date;
}