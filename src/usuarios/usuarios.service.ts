import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(usuario: CreateUsuarioDto) {
    return await this.usuarioRepository.save({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
    });
  }

  async findAll() {
    return await this.usuarioRepository.find({
      select: ['id', 'nome', 'email'],
    });
  }

  async findOneOrFail(conditions: FindOptionsWhere<Usuario>) {
    try {
      return await this.usuarioRepository.findOneByOrFail(conditions);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOneByOrFail({ id });
    this.usuarioRepository.merge(usuario, updateUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
