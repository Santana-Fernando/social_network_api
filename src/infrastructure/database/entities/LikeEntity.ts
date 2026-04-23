import { Column, PrimaryGeneratedColumn } from "typeorm";

export class PostEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    public autor_id!: number;

    @Column()
    public post_id!: number;

    @Column()
    public readonly data_cadastro!: Date;
}