import { UsuarioViewModel } from "../../../application/ViewModel/UsuarioViewModel";
import { Usuario } from "../../../domain/entities/Usuario";

export class DomainToViewModel {
  static toResponseDTO(usuario: Usuario): UsuarioViewModel {
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      nick: usuario.nick,
      dataCadastro: usuario.dataCadastro,
      senha: '',
      confirmacaoSenha:''
    };
  }
}