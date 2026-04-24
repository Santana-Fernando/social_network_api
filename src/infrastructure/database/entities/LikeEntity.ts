import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('likes')
export class LikeEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    public autor_id!: number;

    @Column()
    public post_id!: number;

    @Column()
    public readonly data_cadastro!: Date;
}