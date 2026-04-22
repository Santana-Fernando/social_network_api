import { UsuarioViewModel } from "../../../application/ViewModel/UsuarioViewModel";
import { Usuario } from "../../../domain/entities/Usuario";

export class ViewModelToDomain {
  static toDomain(viewModel: UsuarioViewModel): Usuario {

    var usuario = new Usuario();
    
    usuario.nome = viewModel.nome;  
    usuario.email = viewModel.email;
    usuario.nick =  viewModel.nick;
    usuario.senha = viewModel.senha;
    usuario.dataAlteracao = new Date();
    
    return usuario;
  }
}