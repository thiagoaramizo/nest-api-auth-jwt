import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(usuario: Usuario) {
    const payload = {
      sub: usuario.id,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validarUsuario(email: string, senha: string) {
    let usuario: Usuario;
    try {
      usuario = await this.usuariosService.findOneOrFail({ email });
    } catch (error) {
      return null;
    }

    if (senha === usuario.senha) {
      return usuario;
    } else return null;
  }
}
