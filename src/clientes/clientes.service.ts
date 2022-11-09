import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(cliente: CreateClienteDto) {
    return await this.clienteRepository.save({
      nome: cliente.nome,
      documento: cliente.documento,
      tipo: cliente.tipo,
    });
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }

  async findOne(id: string): Promise<Cliente> {
    /*return await this.clienteRepository
      .createQueryBuilder('cliente')
      .where('cliente.id = :id', { id: id })
      .getOne();*/
    return await this.clienteRepository.findOneByOrFail({ id });
  }

  async findOneOrFail(conditions: FindOptionsWhere<Cliente>) {
    try {
      return await this.clienteRepository.findOneByOrFail(conditions);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.findOneByOrFail({ id });
    this.clienteRepository.merge(cliente, updateClienteDto);
    return await this.clienteRepository.save(cliente);
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
