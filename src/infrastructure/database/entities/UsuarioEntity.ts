import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  nome!: string;

  @Column({ length: 150, unique: true })
  email!: string;

  @Column({ length: 100, unique: true })
  nick!: string;

  @Column()
  senha!: string;

  @CreateDateColumn({ name: 'data_cadastro' })
  dataCadastro!: Date;

  @UpdateDateColumn({ name: 'data_alteracao' })
  dataAlteracao!: Date;
}