import { UsuarioViewModel } from "../ViewModel/UsuarioViewModel";

export interface IUsuarioService {
  insert(usuario: UsuarioViewModel): Promise<void>;
  login(email: string, senha: string): Promise<string>;
}