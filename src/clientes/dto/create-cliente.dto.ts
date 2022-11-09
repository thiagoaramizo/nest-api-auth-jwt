import { IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  documento: string;

  @IsNotEmpty()
  tipo: string;
}
