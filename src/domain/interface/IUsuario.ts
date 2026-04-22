import { Usuario } from '../entities/Usuario'

export interface IUsuario {
  insert(usuario: Usuario): Promise<void>;
}