import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @CreateDateColumn()
  dataCriacao: string;

  @UpdateDateColumn()
  dataEdicao: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  situacao: boolean;

  @Column({
    default: 'user',
  })
  permissao: string;
}
