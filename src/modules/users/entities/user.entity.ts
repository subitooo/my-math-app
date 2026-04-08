import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    login: string;

    @Column()
    passwordHash: string;

    @Column({ type: "text", nullable: true })
    refreshTokenHash: string | null;

    @Column({ type: "timestamp without time zone"})
    createdAt: Date;
}