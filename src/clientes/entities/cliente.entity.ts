import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  documento: string;

  @Column()
  tipo: string;

  @CreateDateColumn()
  dataCriacao: string;

  @UpdateDateColumn()
  dataEdicao: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  situacao: boolean;
}
