import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  titulo!: string;

  @Column()
  public conteudo!: string;

  @Column()
  public autor_id!: number;

  @Column()
  public likes_count!: number;

  @Column()
  public readonly data_cadastro!: Date;

  @Column()
  public data_atualizacao?: Date;
}
